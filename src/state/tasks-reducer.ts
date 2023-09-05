import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionTypes} from "./todolist-reducer";
import {TaskPriotities, TaskStatuses, TaskType, todolistsApi, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionType, AppRootStateType} from "./store";
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError, handleServerNerworkError} from "../utils/error-utils";

export type TasksActionsTypes = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionTypes
    | SetTastsActionType
export type ThunkDispatch = Dispatch<AppActionType | SetStatusActionType | SetErrorActionType>

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistID: string
}
export type SetTastsActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistID] = filteredTasks

            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }

        case 'UPDATE-TASK': {
            const stateCopy = {...state}
            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(t => t.id === action.taskId
                ? {...t, ...action.model}
                : t)

            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(t => t.id === action.taskId
                ? {...t, title: action.title}
                : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[action.todolist.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}

            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string,
                             model: UpdateDomainTaskModelType,
                             todolistID: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistID, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistID, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTastsActionType => {
    return {type: 'SET-TASKS', tasks, todoListId}
}

export const fetchTasksTC = (todolistId: string): any => {
    return async (dispatch: Dispatch<AppActionType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'))
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistID: string): any => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(todolistID, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistID))
            })
    }
}

export const addTaskTC = (title: string, todolistID: string): any => {
    return (dispatch: Dispatch<AppActionType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'))
        todolistsApi.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setStatusAC('failed'))
                }
            })
            .catch((error) => {
                handleServerNerworkError(error, dispatch)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriotities
    startDate?: string
    deadline?: string
}

export const updateTaskStatusTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): any => {
    return (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return;
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: TaskPriotities.Low,
            startDate: task.description,
            title: task.title,
            status: task.status,
            ...domainModel

        }
        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNerworkError(error, dispatch)
            })

    }
}
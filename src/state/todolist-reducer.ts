import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./store";
import {RequestStatusType, setStatusAC, SetStatusActionType} from "../app/app-reducer";

export type TodolistsActionsTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionTypes
    | ChangeTodolistEntityStatusActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    id: string
    status: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type SetTodolistsActionTypes = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: 'idle'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const cnageTodoList = state.find(tl => tl.id === action.id)
            if (cnageTodoList) {
                cnageTodoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all',
                    entityStatus: 'idle'
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const changeTodolistEntityStatysAC = (id: string, status: RequestStatusType): ChangeTodolistEntityStatusActionType => (
    {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionTypes => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}


export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC('loading'))

        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('loading'))
            })
    }
}


export const removeTodolistTC = (todolistID: string): AppThunk => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatysAC(todolistID, 'loading'))

        todolistsApi.deleteTodolists(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC(todolistID))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const addTodolistTC = (title: string): any => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC('loading'))
        todolistsApi.createTodolists(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))

            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsApi.updateTodolists(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

type ThunkDispatch = AppActionType | SetStatusActionType
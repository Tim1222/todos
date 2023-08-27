import axios, {AxiosRequestConfig} from "axios";
//import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const settings: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'API-KEY': "93c5f09c-aff4-416b-940b-88765d768a00"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
// type _CreateTodolistResponseType = {
//     resultCode: number
//     title: string[]
//     data: {
//         item: TodolistsType
//     }
// }
// type _DeleteUpdateTodolistResponseType = {
//     resultCode: number
//     title: string[]
//     data: {}
// }
type ResponseType<D = {}> = {
    resultCode: number
    title: string[]
    data: D
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriotities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriotities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriotities
    startDate: string
    deadline: string
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolists(title: string) {
        return instance.post <ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)

    }
}
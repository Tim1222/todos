import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TasksActionsTypes, tasksReducer} from "./tasks-reducer";
import {todolistReducer, TodolistsActionsTypes} from "./todolist-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,
    applyMiddleware(thunk)
)
//типы для всего App
export type AppActionType = TodolistsActionsTypes | TasksActionsTypes

//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

//Можно обойти таким образом
//export type AppDispatch = any

//второй вариант типизации
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>


type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch




// @ts-ignore
window.store = store
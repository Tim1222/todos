import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.title.length) {
        dispatch(setErrorAC(data.title[0]))
    } else {
        dispatch(setErrorAC('some error'))
    }
}
export const handleServerNerworkError = <D>(error: { message: string }, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setErrorAC(error.message ? error.message : "some error"))
    dispatch(setStatusAC('failed'))
}
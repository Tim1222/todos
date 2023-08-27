import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableStan} from "./EditableStan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
        // console.log(e.currentTarget.checked + " " + t.id)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.task.id, props.changeTaskTitle, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeStatusHandler}
            />
            <EditableStan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>

        </div>
    )
})
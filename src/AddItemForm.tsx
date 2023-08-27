import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }

    }
    return <div>

        <TextField
            variant={'standard'}
            label={'Type value'}
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'}>
            <ControlPoint/>
        </IconButton>

    </div>

})
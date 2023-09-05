import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addItemHandler = () => {
        if (newTaskTitle.trim() !== '') {

            addItem(newTaskTitle)

            //addItemHandler(newTaskTitle.trim())
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
            addItemHandler()
            //addItemHandler(newTaskTitle)
           setNewTaskTitle('')
        }

    }
    return <div>

        <TextField
            disabled={disabled}
            variant={'standard'}
            label={'Type value'}
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
            <ControlPoint/>
        </IconButton>

    </div>

})
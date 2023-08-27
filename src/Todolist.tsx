import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableStan} from "./EditableStan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolist-reducer";
//import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}


export const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id, props.tasks))
    }, [props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onComplitedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])


    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New );
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }


    return (
        <div>
            <h3><EditableStan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={props.id}
                    />)
                }


                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/
                }
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/
                }
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/
                }

            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


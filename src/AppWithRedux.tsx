import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {addTaskTC, removeTaskTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useAppDispatch()
    const todoList = useSelector<AppRootStateType, Array<TodolistDomainType>>((state => state.todolist))
    const tasks = useSelector<AppRootStateType, TasksStateType>((state => state.tasks))

    // console.log( todolistsApi.getTodolists())
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistID: string) {
        const action = removeTaskTC(id, todolistID)
        dispatch(action)
    }, [])

    const addTask = useCallback(function (title: string, todolistID: string) {
        const thunk = addTaskTC(title, todolistID)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback(function (taskID: string, status: TaskStatuses, todolistID: string) {
        const thunk = updateTaskStatusTC(taskID, {status}, todolistID)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (taskID: string, newTitle: string, todolistID: string) {
        dispatch(updateTaskStatusTC(taskID, {title: newTitle}, todolistID))
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todoListID: string) {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }, [])

    const removeTodoList = useCallback(function (Id: string) {
        dispatch(removeTodolistTC(Id))
    }, [dispatch])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch])


    const addTodolists = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">

            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px 5px 20px'}}>
                    <AddItemForm addItem={addTodolists}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoList.map((tl) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks

                            return <Grid item>
                                <Paper style={{padding: '15px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
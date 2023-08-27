import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, updateTaskAC} from "./state/tasks-reducer";
import {TaskPriotities, TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoList, dispatchToTodolistReducer] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    });

    function removeTask(id: string, todolistID: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistID))
    }

    function addTask(title: string, todolistID: string) {
        const action = addTaskAC({
            todoListId: todolistID,
            title: title,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "is exists"
        })
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskID: string, status: TaskStatuses, todolistID: string) {
        dispatchToTasksReducer(updateTaskAC(taskID, {status}, todolistID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        dispatchToTasksReducer(updateTaskAC(taskID, {title: newTitle}, todolistID))
    }

    function changeFilter(value: FilterValuesType, todoListID: any) {
        const action = changeTodolistFilterAC(value, todoListID)
        dispatchToTodolistReducer(action)
    }

    let removeTodoList = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)

    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatchToTodolistReducer(changeTodolistTitleAC(todoListID, newTitle))
    }


    function addTodolists(title: string) {
        const action = addTodolistAC({
            id: v1(),
            addedDate: "",
            order: 0,
            title: title
        })
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)

    }

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
                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.Completed);
                            }
                            return <Grid item>
                                <Paper style={{padding: '15px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
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

export default AppWithReducers;
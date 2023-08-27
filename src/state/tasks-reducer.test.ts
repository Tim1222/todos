import {addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {TasksStateType} from '../App'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriotities, TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType = {}
beforeEach(() => {
        startState = {
            'todolistId1': [
                {
                    id: '1',
                    title: "JS",
                    status: TaskStatuses.New,
                    todoListId: 'todolistId1',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                },
                {
                    id: '2',
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                },
                {
                    id: '3',
                    title: "JS",
                    status: TaskStatuses.New,
                    todoListId: 'todolistId1',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: "JS",
                    status: TaskStatuses.New,
                    todoListId: 'todolistId2',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                },
                {
                    id: '2',
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                },
                {
                    id: '3',
                    title: "JS",
                    status: TaskStatuses.New,
                    todoListId: 'todolistId2',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 2,
                    priority: TaskPriotities.Low
                }
            ]
        }
    }
)


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    // expect(endState['todolist2']).every(t => t.id !='2').toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
    // expect(endState['todolistId2'][0].id).toBe('2')
    // expect(endState).toEqual({
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // })
})
test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }


    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        order: 7,
        startDate: '',
        description: '',
        priority: 0,
        id: 'dfsdfsf'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }

    const action = updateTaskAC('2', {}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }

    const action = changeTaskTitleAC('2', 'Milkyway', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkyway')
    expect(endState['todolistId1'][1].title).toBe('JS')

})
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }

    // const action = addTodolistAC('new todolist')
    //
    // const endState = tasksReducer(startState, action)
    //
    //
    // const keys = Object.keys(endState)
    // const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    // if (!newKey) {
    //     throw Error('new key should be added')
    // }
    //
    // expect(keys.length).toBe(3)
    // expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
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
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
                description: '',
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 2,
                priority: TaskPriotities.Low
            }
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const action = setTodolistsAC([
        {id: todolistID1, title: 'What to learn', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)


    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
// test('tasks should be added for todolist', () => {
//
//     const action = setTasksAC(startState['todolistId1'], 'todolistId1' )
//
//     const endState = tasksReducer({
//         'todolistId2': [],
//         'todolistId1': []
//     }, action)
//
//     const keys = Object.keys(endState)
//
//
//     expect(endState['todolistId1']).toBe(3)
//     expect(endState['todolistId2']).toBe(0)
// })
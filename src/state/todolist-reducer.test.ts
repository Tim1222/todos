import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistReducer
} from "./todolist-reducer";

beforeEach(() => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]
})

test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    // const startState: Array<TodolistDomainType> = [
    //     {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    //     {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    // ]
    //
    // const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    //
    // expect(endState.length).toBe(3)
    // expect(endState[0].title).toBe(newTodolistTitle)
    // expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]
    const action = changeTodolistTitleAC(todolistID2, newTodolistTitle)
    //     {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistID2,
    //     title: newTodolistTitle
    // } as const
    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]
    const action = changeTodolistFilterAC(todolistID2, newFilter)
    //     ChangeTodolistFilterActionType  = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistID2,
    //     filter: newFilter
    // }
    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolist should be set to the state', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const action = setTodolistsAC(startState)
    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
})



import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Tima'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('User reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: "Tima"}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
    expect(endState.name).toBe('Tima')


})

test('User reducer change name of user', () => {
    const startState = { name: 'Tima', age: 20, childrenCount: 2}
    const newName = 'Victor'
    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
} )
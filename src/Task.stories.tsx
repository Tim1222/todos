import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskPriotities, TaskStatuses} from "./api/todolists-api";
import {v1} from "uuid"

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const changeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
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
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistID1'}
        />
        <Task
            task={{
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
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={changeTaskCallback}
            todolistId={'todolistID1'}
        />
    </>
}
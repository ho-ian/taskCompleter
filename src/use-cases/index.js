import makeAddTask from './add-task'
import makeEditTask from './edit-task'
import makeRemoveTask from './remove-task'
import makeListTasks from './list-tasks'
import tasksDb from '../taskdb'

const addTask = makeAddTask({ tasksDb })
const editTask = makeEditTask({ tasksDb })
const removeTask = makeRemoveTask({ tasksDb })
const listTasks = makeListTasks({ tasksDb })

const taskService = Object.freeze({
    addTask,
    editTask,
    removeTask,
    listTasks
})

export default taskService
export { addTask, editTask, removeTask, listTasks }

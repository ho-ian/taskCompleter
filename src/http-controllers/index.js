import makePostTask from './post-task'
import makeDeleteTask from './delete-task'
import makeGetTasks from './get-tasks'
import makePatchTask from './patch-task'
import notFound from './not-found'

import { addTask, editTask, removeTask, listTasks } from '../use-cases'

const postTask = makePostTask(addTask)
const deleteTask = makeDeleteTask(removeTask)
const getTasks = makeGetTasks(listTasks)
const patchTask = makePatchTask(editTask)

const taskController = Object.freeze({
    postTask,
    deleteTask,
    getTasks,
    patchTask,
    notFound
})

export default taskController
export { postTask, deleteTask, getTasks, patchTask, notFound }
export default function makeRemoveTask ({ tasksDb }) {
    return async function removeTask ({ id } = {} ) {
        if (!id) {
            throw new Error('You must supply an id.')
        }

        const taskToDelete = await tasksDb.findById({id})

        if (!taskToDelete) {
            return deleteNothing()
        }
        
        return hardDelete(taskToDelete)   
    }

    function deleteNothing() {
        return {
            deleteCount: 0,
            message: 'Task not found, nothing to delete.'
        }
    }

    async function hardDelete(task) {
        await tasksDb.remove(task)
        return {
            deleteCount: 1,
            message: 'Task deleted.'
        }
    }
}
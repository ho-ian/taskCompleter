export default function makeListTasks ({ tasksDb }) {
    return async function listTasks ( { ...parameters } = {}) {
        if (!parameters.taskId && !parameters.date && !parameters.start && !parameters.end && !parameters.title && !parameters.author && !parameters.completed) {
            throw new Error('You must supply an author, title, date, start, end, taskId, or compeleted.')
        }

        const tasks = await tasksDb.findByEnsemble({...parameters})
        
        return tasks
    }
}
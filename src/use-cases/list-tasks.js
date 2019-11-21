export default function makeListTasks ({ tasksDb }) {
    return async function listTasks ( { ...parameters } = {}) {
        if (parameters.id || parameters.createdOn || parameters.hash || parameters.modifiedOn || parameters.description || parameters.source) {
            throw new Error('Invalid search parameters.')
        }
        const tasks = await tasksDb.findByEnsemble({...parameters})
        return tasks
    }
}
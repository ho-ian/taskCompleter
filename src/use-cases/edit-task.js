import makeTask from '../task'
export default function makeEditTask ({ tasksDb }) {
    return async function editTask ({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        if (!changes.title && !changes.description && !changes.start && !changes.end && !changes.date && !changes.completed) {
            throw new Error('You must supply a change to the title, description, start, or end time.')
        }
        const existing = await tasksDb.findById({id})
        if (!existing) {
            throw new RangeError('Task not found.')
        }
        const task = makeTask({...existing, ...changes, modifiedOn: Date.now()})
        if (task.getHash() === existing.hash) {
            return existing
        }
        const updated = await tasksDb.update({
            id: task.getId(),
            modifiedOn: task.getModifiedOn(),
            title: task.getTitle(),
            description: task.getDescription(),
            date: task.getDate(),
            start: task.getStart(),
            end: task.getEnd(),
            hash: task.getHash(),
            completed: task.isCompleted()
        })
        return {...existing, ...updated}
    }
}
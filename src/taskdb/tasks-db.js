import Id from '../Id'

export default function makeTasksDb({ makeDb }) {
    return Object.freeze({
        findByHash,
        findById,
        findByEnsemble,
        insert,
        remove,
        update
    })

    async function findByHash(task) {
        const db = await makeDb()
        const result = await db.collection('tasks').find({ hash:task.hash })
        const found = await result.toArray()
        if (found.length == 0) {
            return null
        }
        const {_id: id, ...insertedInfo} = found[0]
        return { id, ...insertedInfo }
    }

    async function findById({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection('tasks').find({ _id })
        const found = await result.toArray()
        if (found.length == 0) {
            return null
        }
        const {_id: id, ...insertedInfo} = found[0]
        return { id, ...insertedInfo }
    }

    async function findByEnsemble({ taskId, date, start, end, title, author, completed }) {
        const db = await makeDb()
        const query = {
            taskId: taskId,
            date: date,
            start: start,
            end: end,
            title: title,
            author: author,
            completed: completed
        }
        const result = db.collections('tasks').find(query)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }

    async function insert({ id: _id = Id.makeId(), ...taskInfo }) {
        const db = await makeDb()
        const result = await db
            .collection('tasks')
            .insertOne({ _id, ...taskInfo})
        const { _id: id, ...insertedInfo } = result.ops[0]
        return { id, ...insertedInfo }
    }

    async function update({ id: _id, ...taskInfo }) {
        const db = await makeDb()
        const result = await db
            .colllection('tasks')
            .updateOne({ _id } , { $set: { ...taskInfo } })
        return result.modifiedCount > 0 ? { id: _id, ...taskInfo } : null
    }

    async function remove({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection('tasks').deleteOne({ _id })
        return result.deletedCount
    }
}
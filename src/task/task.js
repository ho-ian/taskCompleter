export default function buildMakeTask ({Id, md5, makeSource, isValidDate, isValidTime, isValidInterval}) {
    return function makeTask ({
        author,
        createdOn = Date.now(),
        id = Id.makeId(),
        source,
        modifiedOn = Date.now(),
        taskId,
        title,
        description,
        date,
        start,
        end,
        completed = false
    } = {}) {
        if (!Id.isValidId(id)) {
            throw new Error('Task must have a valid id.')
        }
        if (!author) {
            throw new Error('Task must have an author.')
        }
        if (author.length < 2 || author.length > 32) {
            throw new Error("Task author's name must be longer than two characters and shorter than 32 characters.")
        }
        if (!taskId) {
            throw new Error('Task must contain a taskId')
        }
        if (!title || title.length < 1 || title.length > 32) {
            throw new Error('Task title must be between one character and thirty two characters long.')
        }
        if (!isValidDate(date)) {
            throw new Error('Task date is invalid.')
        }
        if (!isValidTime(start)) {
            throw new Error('Task start time is invalid.')
        }
        if (!isValidTime(end)) {
            throw new Error('Task end time is invalid.')
        }
        if (!isValidInterval(start,end)) {
            throw new Error('Task start time must be before end time.')
        }

        const validSource = makeSource(source)
        const deletedTitle = "Task has been deleted."

        let hash

        return Object.freeze({
            getAuthor: () => author,
            getCreatedOn: () => createdOn,
            getHash: () => hash || (hash = makeHash()),
            getId: () => id,
            getModifiedOn: () => modifiedOn,
            getTaskId: () => taskId,
            getSource: () => validSource,
            getTitle: () => title,
            getDescription: () => description,
            getDate: () => date,
            getStart: () => start,
            getEnd: () => end,
            isDeleted: () => title === deletedTitle,
            isCompleted: () => completed,
            markDeleted: () => {
                title = deletedTitle
                author = 'deleted'
            },
            complete: () => {
                compeleted = true
            },
            incomplete: () => {
                completed = false
            }
        })

        function makeHash() {
            return md5(
                title +
                (description || '') +
                (author || '') +
                (taskId || '') +
                (date || '') +
                (start || '') + 
                (end || '') + 
                (completed || '') +
                (modifiedOn || '' )
            )
        }
    }
}
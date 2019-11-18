import makeTask from '../task'
export default function makeAddTask ({ tasksDb }) {
    return async function addTask (taskInfo) {
        const task = makeTask(taskInfo)
        const exists = await tasksDb.findByHash({ hash: task.getHash() })
        if (exists) {
            return exists
        }

        const taskSource = task.getSource()
        return tasksDb.insert({
            author: task.getAuthor(),
            createdOn: task.getCreatedOn(),
            id: task.getId(),
            hash: task.getHash(),
            modifiedOn: task.getModifiedOn(),
            taskId: task.getTaskId(),
            title: task.getTitle(),
            description: task.getDescription(),
            date: task.getDate(),
            start: task.getStart(),
            end: task.getEnd(),
            completed: task.isCompleted(),
            source: {
                ip: taskSource.getIp(),
                browser: taskSource.getBrowser(),
                referrer: taskSource.getReferrer()
            }
        })
    }
}
export default function makeGetTasks({ listTasks }) {
    return async function getTasks(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const { ...parameters } = httpRequest.query
            const postTasks = await listTasks({...parameters})
            return {
                headers,
                statusCode: 200,
                body: postTasks
            }
        } catch(e) {
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}
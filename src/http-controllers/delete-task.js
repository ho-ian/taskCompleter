export default function makeDeleteTask({ removeTask }) {
    return async function deleteTask(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const deleted = await removeTask( {id: httpRequest.params.id })
            return {
                headers,
                statusCode: deleted.deleteCount === 0 ? 404 : 200,
                body: {
                    deleted
                }
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
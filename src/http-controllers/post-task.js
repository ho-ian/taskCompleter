export default function makePostTask ({ addTask }) {
    return async function postTask (httpRequest) {
        try {
            const { source = {}, ...taskInfo } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['Users-Agent']
            if (httpRequest.headers['Referrer']) {
                source.referrer = httpRequest.headers['Referrer']
            }
            const posted = await addTask({
                ...taskInfo,
                source
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(posted.modifiedOn).toUTCString()
                },
                statusCode: 201,
                body: {
                    posted
                }
            }
        } catch(e) {
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}
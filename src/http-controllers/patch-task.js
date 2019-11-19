export default function makePatchTask ({ editTask }) {
    return async function patchTask (httpRequest) {
        try {
            const { source = {}, ...taskInfo } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referrer']) {
                source.referrer = httpRequest.headers['Referrer']
            }
            const toEdit = {
                ...taskInfo,
                source,
                id: httpRequest.params.id
            }
            const patched = await editTask(toEdit)
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(patched.modifiedOn).toUTCString()
                },
                statusCode: 200,
                body: {
                    patched
                }
            }
        } catch(e) {
            console.log(e)
            if (e.name === 'RangeError') {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 404,
                    body: {
                        error: e.message
                    }
                }
            }
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
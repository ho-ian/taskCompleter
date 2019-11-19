export default function notFound () {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: 404,
        body: {
            error: 'Not found.'
        }
    }
}
module.exports = function makeExpressCallback (taskController) {
    return (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                'Referrer': req.get('Referrer'),
                'User-Agent': req.get('User-Agent')
            }
        }
        taskController(httpRequest).then(httpResponse => {
            if (httpResponse.headers) {
                res.set(httpResponse.headers)
            }
            res.type('json')
            res.status(httpResponse.statusCode)
            res.send(httpResponse.body)
        })
        .catch(e => res.status(500).send({ error: 'An unknown error has occurred.' }))
    }
}
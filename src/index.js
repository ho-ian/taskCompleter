import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { postTask, deleteTask, getTasks, patchTask, notFound } from './http-controllers'
import makeExpressCallback from './express-callback'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use((_, res, next) => {
    res.set({ Tk: '!' })
    next()
})
app.post('/tasks', makeExpressCallback(postTask))
app.delete('/tasks/:id', makeExpressCallback(deleteTask))
app.patch('/tasks/:id',makeExpressCallback(patchTask))
app.get('/tasks', makeExpressCallback(getTasks))
app.use(makeExpressCallback(notFound))

app.listen(3500, () => {
    console.log('Server is listening on port 3500')
})

export default app
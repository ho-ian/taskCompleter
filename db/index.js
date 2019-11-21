import { makeDb } from '../src/taskdb'
import dotenv from 'dotenv'
dotenv.config()
async function setupDb() {
    console.log('Setting up database...')
    const db = await makeDb()
    const result = await db
        .collection('tasks')
        .createIndexes([
            { key: {hash: 1}, name: 'hash_idx' },
            { key: {taskId: -1}, name: 'taskId_idx' },
            { key: {date: -1}, name: 'date_idx' },
            { key: {start: -1}, name: 'start_idx' },
            { key: {end: -1}, name: 'end_idx' },
            { key: {title: -1}, name: 'title_idx' },
            { key: {author: -1}, name: 'author_idx' },
            { key: {completed: -1}, name: 'completed_idx' },
        ])
        console.log(result)
        console.log('Database setup complete.')
        process.exit()
}

setupDb()
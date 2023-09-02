import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { router as fileRouter }  from './router/file-router.js'
import { __storagepath } from './middlewares/dirpaths.js'

dotenv.config()

const PORT = process.env.PORT 
const app = express()

app.use(express.json())
app.use(cors())
app.use('/storage', express.static(__storagepath))
app.use('/files', fileRouter)

app.get('/', (req,res) => res.json({greetings: 'Welcome to my home server cloud ;3'}))

app.listen(PORT , () => {
    console.log(`Home server cloud running on port http://localhost:${PORT}`)
})
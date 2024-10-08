
const express = require('express')
const path = require('path')
const { userRouter } = require('./routes/user.routes.js')
const { logTime } = require('./middleware/index.js')
const { boardRouter } = require('./routes/board.routes.js')
const { taskRouter } = require('./routes/task.routes.js')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const ORIGIN = process.env.ORIGIN

const cors = require('cors')

const app = express()

app.use(cors({
    origin: ORIGIN,
    credentials: true,
}))


app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logTime)
app.use('/api/users', userRouter)
app.use('/api/board', boardRouter)

app.use('/api/tasks', taskRouter)

module.exports = {
    app
}
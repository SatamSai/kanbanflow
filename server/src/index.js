const { app } = require('./app.js')
require('dotenv').config();

const DB_URL = process.env.MONGO_URL

const PORT = process.env.PORT

const connectDB = require('./connection.js')

connectDB(DB_URL)
    .then(
        app.listen(PORT, () => {
            console.log("Server running at ", PORT)
        })
    )
    .catch(err => {
        console.log("Failed!!" + err)
    })
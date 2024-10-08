const mongoose = require('mongoose')

const connectDB = async (local) => {
    const connectionInstance = await mongoose.connect(local)
    console.log("connected to mongoDB", connectionInstance.connection.host)
    return connectionInstance
}

module.exports = connectDB
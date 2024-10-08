const { Schema, model } = require("mongoose");


const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    subTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    priority: {
        type: String,
        required: true,
        default: "Low"
    },
    status: {
        type: String,
        default: "Unassigned"
    }
}, { timestamps: true })


const Task = model("Task", taskSchema)

module.exports = {
    taskSchema,
    Task
}
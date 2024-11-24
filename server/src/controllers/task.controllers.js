const { validationResult } = require("express-validator")
const { Board } = require("../models/board.model")
const { Task } = require("../models/task.model")
const { User } = require("../models/user.model")

const handleCreateTask = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const boardId = req.params.boardId
    const userId = req.user._id

    const { title, description, priority, status, subTasks } = req.body

    const task = new Task({
        title: title,
        description: description,
        priority: priority,
        status: status,
        subTasks: subTasks,
        createdBy: userId,
        assignedTo: userId,
        board: boardId
    })

    try {
        const savedTask = await task.save()

        const board = await Board.findById(boardId)
        board.tasks.push(savedTask._id)

        board.save()

        res.status(200).json(savedTask)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetTaskById = async (req, res) => {
    const task = req.task

    return res.status(200).json(task)
}


const handleUpdateTask = async (req, res) => {
    const taskId = req.params.taskId

    const { title, description, priority, status, subTasks } = req.body


    const missingFields = [];

    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!priority) missingFields.push("priority");
    if (!status) missingFields.push("status");
    if (!subTasks) missingFields.push("subTasks");


    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}.`
        });
    }

    try {
        const validSubTasks = await Task.find({ _id: { $in: subTasks } });

        if (validSubTasks.length !== subTasks.length) {
            return res.status(400).json({
                success: false,
                message: "One or more SubTasksIDs do not exist in the database."
            });
        }

        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                title: title,
                description: description,
                priority: priority,
                status: status,
                subTasks: subTasks
            },
            { new: true }
        )
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleDeleteTask = async (req, res) => {
    const taskId = req.params.taskId

    try {
        const task = await Task.findByIdAndDelete(taskId)

        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleAssignTask = async (req, res) => {
    const taskId = req.params.taskId
    const userId = req.body.userId

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            message: "User to whom task is being assigned not Found!"
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                assignedTo: userId
            },
            {
                new: true
            }
        ).populate({
            path: 'assignedTo',
            select: 'fullname'
        })

        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleUpdatePriority = async (req, res) => {
    const taskId = req.params.taskId
    const priority = req.body.priority

    const priorityOptions = [
        "Very Low",
        "Low",
        "Medium",
        "High",
        "Very High"
    ]

    if (!priorityOptions.includes(priority)) {
        return res.status(400).json({
            message: "Invalid Priority value passed!"
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            {
                priority: priority
            },
            {
                new: true
            }
        )

        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleUpdateStatus = async (req, res) => {
    const status = req.body.status
    const task = req.task
    const board = req.board

    try {
        const columns = board.columns

        if (!columns.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value passed!"
            })
        }
        task.status = status

        await task.save()

        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleUpdateIsDone = async (req, res) => {
    const taskId = req.params.taskId
    const isDone = req.body.isDone

    const task = await Task.findByIdAndUpdate(
        taskId,
        {
            isDone: isDone
        },
        {
            new: true
        }
    )

    return res.status(200).json(task)
}

const handleGetSubTasks = async (req, res) => {
    const taskId = req.params.taskId

    const task = await Task.findById(taskId).populate('subTasks').exec()

    return res.status(200).json(task.subTasks)
}

const handleGetTaskBySearchTerm = async (req, res) => {
    const searchTerm = req.query.searchTerm.toLowerCase()
    const boardId = req.params.boardId

    try {
        const board = await Board.findById(boardId).populate('tasks').exec()

        const tasks = board.tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm)
        )
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleGetTaskById,
    handleAssignTask,
    handleUpdatePriority,
    handleUpdateStatus,
    handleUpdateIsDone,
    handleGetSubTasks,
    handleGetTaskBySearchTerm
}
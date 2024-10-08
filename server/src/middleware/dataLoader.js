const { Board } = require("../models/board.model")
const { Task } = require("../models/task.model")

const loadPreReqtData = async (req, res, next) => {
    const { taskId, boardId } = req.params

    let board

    try {
        if (taskId) {
            const task = await Task.findById(taskId).populate('board')
                .populate({ path: 'createdBy', select: '-password -boards -createdAt -updatedAt' })
                .populate({ path: 'assignedTo', select: '-password -boards -createdAt -updatedAt' })
                .populate('subTasks').exec()
            if (!task) {
                return res.status(404).json({
                    message: "Task Not Found"
                })
            }

            req.task = task
            board = task.board
        }
        else if (boardId) {
            board = await Board.findById(boardId)
            if (!board) {
                return res.status(404).json({
                    message: "Board Not Found"
                })
            }
        }

        req.board = board
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    loadPreReqtData
}
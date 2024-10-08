const { body } = require('express-validator');

const titleValidation = body('title')
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3, max: 100 }).withMessage("Title must have 3 to 100 characters")

const descriptionValidation = body('description')
    .trim()
    .optional()
    .isLength({ max: 500 }).withMessage("Description can have 500 characters")

const priorityValidation = body('priority')
    .notEmpty().withMessage("Priority is required")
    .isIn(["Very Low", "Low", "Medium", "High", "Very High"]).withMessage("Priority value is invalid")

const statusValidation = body('status')
    .notEmpty().withMessage("Status is required")
    .custom((value, { req }) => {
        const validStatuses = req.board.columns
        return validStatuses.includes(value)

    }).withMessage("Invalid Status value")

const subTasksValidation = body('subTasks')
    .notEmpty().withMessage("Subtasks are required")
    .isArray().withMessage("Subtasks should be an array")
    .custom((value, { req }) => {
        const validSubTasks = req.board.tasks

        const invalid = value.find(task => !validSubTasks.includes(task)) || []

        return invalid.length == 0
    }).withMessage("Invalid one or more Subtask/s provided")

const validateColums = body('columns')
    .notEmpty().withMessage("Columns are required")
    .isArray().withMessage("Columns should be an array")
    .custom((columns) => {
        return columns.every(item => typeof item === 'string');
    }).withMessage("Columns should be an array of strings");

const memberValidation = body('member')
    .notEmpty().withMessage("Member is required")
    .custom((member, { req }) => {
        const board = req.board

        return board.members.includes(member)
    })

const isDoneValidation = body('isDone')
    .notEmpty().withMessage("isDone is required")
    .isBoolean().withMessage("isDone should be boolean")

module.exports = {
    titleValidation,
    descriptionValidation,
    priorityValidation,
    statusValidation,
    subTasksValidation,
    validateColums,
    memberValidation,
    isDoneValidation
}
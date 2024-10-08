const { Router } = require("express");
const { handleCreateTask, handleUpdateTask, handleDeleteTask, handleGetTaskById, handleAssignTask, handleUpdatePriority, handleUpdateStatus, handleGetSubTasks, handleGetTaskBySearchTerm, handleUpdateIsDone } = require("../controllers/task.controllers");
const { verifyToken, roleBasedAccessControl } = require("../middleware/auth");
const { titleValidation, descriptionValidation, priorityValidation, statusValidation, subTasksValidation, memberValidation, isDoneValidation } = require("../utils/helper_functions");
const { loadPreReqtData } = require("../middleware/dataLoader");

const router = Router()

router.route('/board/:boardId/createTask')
    .post(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        [titleValidation, descriptionValidation, priorityValidation, statusValidation, subTasksValidation],
        handleCreateTask
    )

router.route('/:taskId')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        handleGetTaskById
    )
    .patch(
        verifyToken,
        loadPreReqtData,
        [titleValidation, descriptionValidation, priorityValidation, statusValidation, subTasksValidation],
        roleBasedAccessControl(["owner"]),
        handleUpdateTask
    )
    .delete(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        handleDeleteTask
    )

router.route('/:taskId/assignTask')
    .patch(
        verifyToken,
        loadPreReqtData,
        [memberValidation],
        roleBasedAccessControl(["owner"]),
        handleAssignTask
    )

router.route('/:taskId/updatePriority')
    .patch(
        verifyToken,
        loadPreReqtData,
        [priorityValidation],
        roleBasedAccessControl(["owner"]),
        handleUpdatePriority
    )

router.route('/:taskId/updateStatus')
    .patch(
        verifyToken,
        loadPreReqtData,
        [statusValidation],
        roleBasedAccessControl(["owner"]),
        handleUpdateStatus
    )

router.route('/:taskId/updateIsDone')
    .patch(
        verifyToken,
        loadPreReqtData,
        [isDoneValidation],
        roleBasedAccessControl(["owner"]),
        handleUpdateIsDone
    )

router.route('/:taskId/getSubTasks')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        handleGetSubTasks
    )

router.route('/board/:boardId/')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        handleGetTaskBySearchTerm
    )

module.exports = {
    taskRouter: router
}
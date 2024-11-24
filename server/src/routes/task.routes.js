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
        roleBasedAccessControl(["owner", "admin", "editor"]),
        [titleValidation, descriptionValidation, priorityValidation, statusValidation, subTasksValidation],
        handleCreateTask
    )

router.route('/:taskId')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetTaskById
    )
    .patch(
        verifyToken,
        loadPreReqtData,
        [titleValidation, descriptionValidation, priorityValidation, statusValidation, subTasksValidation],
        roleBasedAccessControl(["owner", "admin", "editor"]),
        handleUpdateTask
    )
    .delete(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor"]),
        handleDeleteTask
    )

router.route('/:taskId/assignTask')
    .patch(
        verifyToken,
        loadPreReqtData,
        [memberValidation],
        roleBasedAccessControl(["owner", "admin", "editor", "contributor"]),
        handleAssignTask
    )

router.route('/:taskId/updatePriority')
    .patch(
        verifyToken,
        loadPreReqtData,
        [priorityValidation],
        roleBasedAccessControl(["owner", "admin", "editor", "contributor"]),
        handleUpdatePriority
    )

router.route('/:taskId/updateStatus')
    .patch(
        verifyToken,
        loadPreReqtData,
        [statusValidation],
        roleBasedAccessControl(["owner", "admin", "editor", "contributor"]),
        handleUpdateStatus
    )

router.route('/:taskId/updateIsDone')
    .patch(
        verifyToken,
        loadPreReqtData,
        [isDoneValidation],
        roleBasedAccessControl(["owner", "admin", "editor", "contributor"]),
        handleUpdateIsDone
    )

router.route('/:taskId/getSubTasks')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetSubTasks
    )

router.route('/board/:boardId/')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetTaskBySearchTerm
    )

module.exports = {
    taskRouter: router
}
const { Router } = require('express')
const { handleGetAllUserBoards, handleCreateNewBoard, handleDeleteBoardById, handleAddMemberToBoard, handleRemoveMember, handleGetBoardMembers, handleUpdateBoardById, handleGetBoardById, handleGetBoardTasks, handleGenerateInvite, handleGetInviteInfo, handleInvitationAction } = require('../controllers/board.controllers')
const { verifyToken, roleBasedAccessControl } = require('../middleware/auth')
const { loadPreReqtData } = require('../middleware/dataLoader')

const router = Router()
router.route('/')
    .get(verifyToken, handleGetAllUserBoards)
    .post(verifyToken, handleCreateNewBoard)

router.route('/:boardId')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetBoardById
    )
    .patch(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin"]),
        handleUpdateBoardById)
    .delete(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner"]),
        handleDeleteBoardById
    )

router.route('/generateInvite/:boardId')
    .post(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin"]),
        handleGenerateInvite
    )

router.route('/:inviteToken/getInviteInfo')
    .get(
        verifyToken,
        handleGetInviteInfo
    )

router.route('/:inviteToken/invitationAction')
    .post(
        verifyToken,
        handleInvitationAction,
        handleAddMemberToBoard
    )

router.route('/:boardId/removeMember')
    .patch(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin"]),
        handleRemoveMember
    )

router.route('/:boardId/getMembers')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetBoardMembers
    )

router.route('/:boardId/getTasks')
    .get(
        verifyToken,
        loadPreReqtData,
        roleBasedAccessControl(["owner", "admin", "editor", "contributor", "viewer"]),
        handleGetBoardTasks
    )

module.exports = {
    boardRouter: router,
}
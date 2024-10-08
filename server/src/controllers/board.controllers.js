const { Board } = require("../models/board.model")
const { Invitation } = require("../models/invitation.model")
const { User } = require("../models/user.model")
const { nanoid } = require('nanoid')



const handleGetAllUserBoards = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId).populate('boards').exec()
        res.status(200).json(user.boards)
    } catch (e) {
        res.status(500).json({ message: e })
    }
}

const handleCreateNewBoard = async (req, res) => {
    const body = req.body
    const userId = req.user._id

    const missingFields = [];

    if (!body.title) missingFields.push("title");
    if (!body.description) missingFields.push("description");
    if (!body.columns) missingFields.push("columns");


    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}.`
        });
    }

    const newBoard = new Board({
        title: body.title,
        description: body.description,
        columns: body.columns,
        owner: userId
    })

    const owner = {
        user: userId,
        role: "owner"
    }

    newBoard.members.push(owner)

    try {
        const savedBoard = await newBoard.save()
        const user = await User.findById(userId)
        user.boards.push(savedBoard._id)
        await user.save()
        return res.status(200).json(savedBoard)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetBoardById = async (req, res) => {
    const boardId = req.params.boardId

    try {
        const board = await Board.findById(boardId).populate({ path: 'owner', select: '-password -boards -createdAt -updatedAt' }).select("-members -tasks").exec()

        return res.status(200).json(board)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleUpdateBoardById = async (req, res) => {
    const boardId = req.params.boardId
    const updatedInfo = req.body

    try {
        const board = await Board.findByIdAndUpdate(
            boardId,
            {
                title: updatedInfo.title,
                description: updatedInfo.description,
                columns: updatedInfo.columns
            },
            {
                new: true
            }
        )

        await board.save()

        return res.status(200).json(board)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

const handleDeleteBoardById = async (req, res) => {
    const boardId = req.params.boardId

    try {
        const board = await Board.findByIdAndDelete(boardId)
        await User.updateMany(
            {
                boards: boardId
            },
            {
                $pull: {
                    boards: boardId
                }
            }
        )
        return res.status(200).json(board)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleAddMemberToBoard = async (req, res) => {
    const boardId = req.boardId
    const memberId = req.user._id

    try {
        const board = await Board.findById(boardId)
        const member = await User.findById(memberId)
        if (board.members.filter(member => member.user._id.equals(memberId)).length > 0) {
            return res.status(400).json({
                success: false,
                message: "User is already a member of the board.",
                error: {
                    code: "MEMBER_ALREADY_EXISTS",
                    details: "The user you are trying to add is already a member of this board."
                }
            });
        }

        const newMember = {
            user: memberId,
            role: req.role
        }

        board.members.push(newMember)
        await board.save()

        member.boards.push(board._id)
        await member.save()

        await board.populate('members.user');

        return res.status(200).json(board)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGenerateInvite = async (req, res) => {
    const generatedBy = req.user._id
    const body = req.body

    const missingFields = [];

    if (!body.boardId) missingFields.push("boardId");
    if (!body.role) missingFields.push("role");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}.`
        });
    }

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    const token = nanoid()

    const inviteDetails = {
        board: body.boardId,
        expiresAt: expiryDate,
        token: token,
        generatedBy: generatedBy,
        role: body.role
    }

    try {
        const invite = new Invitation(inviteDetails)
        await invite.save()
        return res.status(200).json(invite)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetInviteInfo = async (req, res) => {
    const inviteToken = req.params.inviteToken

    try {
        const invite = await Invitation.findOne({ token: inviteToken })
            .populate({ path: 'generatedBy', select: '-password -createdAt -updatedAt -boards' })
            .populate('board').exec()

        if (!invite) {
            return res.status(404).json({
                message: "Invite Not Found"
            })
        }

        return res.status(200).json(invite)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleInvitationAction = async (req, res, next) => {
    const accept = req.body.accept
    const userId = req.user._id
    const inviteToken = req.params.inviteToken

    try {
        const invitation = await Invitation.findOne({
            token: inviteToken
        }).populate('board')

        if (!invitation) {
            return res.status(404).json({
                message: "Request Not Found!"
            })
        }

        if (invitation.expiresAt < new Date()) {
            return res.status(400).json({
                message: "The invitation Token is no longer valid"
            })
        }

        if (invitation.board.members.filter(member => member.user == userId && member.role == invitation.role) > 0) {
            return res.status(409).json({
                message: "Already a member!"
            })
        }

        if (!accept) {
            invitation.expiresAt = new Date()
            await invitation.save()

            return res.status(200).json({
                message: "Successfully Declined Invite"
            })
        }

        req.boardId = invitation.board._id
        req.role = invitation.role
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

const handleRemoveMember = async (req, res) => {
    const boardId = req.params.boardId
    const memberId = req.body.userId

    try {
        const board = await Board.findById(boardId)
        board.members = board.members.filter(member => member.user != memberId)
        await board.save();
        return res.status(200).json(board)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetBoardMembers = async (req, res) => {
    const boardId = req.params.boardId

    try {
        const board = await Board.findById(boardId).populate('members.user').exec()
        const members = board.members.map(member => {
            const user = member.user
            return {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                },
                role: member.role
            }
        })
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetBoardTasks = async (req, res) => {
    const boardId = req.params.boardId

    try {
        const board = await Board.findById(boardId).populate('tasks').exec()
        return res.status(200).json(board.tasks)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    handleGetAllUserBoards,
    handleCreateNewBoard,
    handleDeleteBoardById,
    handleAddMemberToBoard,
    handleRemoveMember,
    handleGetBoardMembers,
    handleUpdateBoardById,
    handleGetBoardById,
    handleGenerateInvite,
    handleGetInviteInfo,
    handleInvitationAction,
    handleGetBoardTasks
}
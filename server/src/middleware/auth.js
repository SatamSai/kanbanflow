const { User } = require("../models/user.model")
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {

    const token = req.cookies?.accessToken

    if (!token) {
        return res.status(400).json({
            "error": "Unauthorized",
            "message": "Missing token. Please log in to access this resource."
        })
    }

    jwt.verify(token, "THIS IS SECRET KEY", async (error, decodedToken) => {
        if (error)
            return res.status(403).json(error)
        try {

            const user = await User.findById(decodedToken._id).select("-password")

            if (!user) {
                return res.status(400).json({
                    "error": "Unauthorized",
                    "message": "Invalid token. Please log in to access this resource."
                })
            }

            req.user = user

            next()
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    })
}

const roleBasedAccessControl = (_allowedRoles) => {
    return async (req, res, next) => {

        const board = req.board
        const boardMember = board.members.find(member => member.user.equals(req.user._id))

        if (!boardMember) {
            return res.status(403).json({
                message: "You are not a member of this board."
            })
        }
        else if (!_allowedRoles.includes(boardMember.role)) {
            return res.status(403).json({
                message: "Access denied: You do not have the required permissions."
            })
        }
        next()
    }
}

module.exports = {
    verifyToken,
    roleBasedAccessControl
}
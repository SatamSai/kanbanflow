const { User } = require('../models/user.model')

const handleGetAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password -boards -createdAt -updatedAt')
    return res.status(200).json(users)
}

const handleCreateNewUser = async (req, res) => {

    const body = req.body

    const missingFields = [];
    if (!body.username) missingFields.push("username");
    if (!body.email) missingFields.push("email");
    if (!body.password) missingFields.push("password");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}.`
        });
    }

    try {
        const userInfo = {
            username: body.username,
            email: body.email,
            password: body.password
        }
        const user = await User.create(userInfo)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const handleSubmitInfo = async (req, res) => {
    const body = req.body
    const userId = req.user._id

    if (!body.fullname) {
        return res.status(400).json({
            message: "Fullname Not Provided"
        })
    }

    try {
        const userInfo = {
            fullname: body.fullname
        }
        const user = await User.findByIdAndUpdate(userId, userInfo).select('-password -boards')

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(403).json({
            message: "Provide Email!"
        })
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(404).json({
            message: "User Not Found!"
        })
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        return res.status(403).json({
            message: "Invalid user credentials"
        })
    }

    try {
        const loggedInUser = await User.findById(user._id).select('-password -baords')

        const accessToken = await user.generateAccessToken()

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(loggedInUser)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const handleGetUserById = async (req, res) => {
    const userId = req.params._id

    if (!userId) {
        return res.status(403).json({
            message: "Provide UserId!"
        })
    }
    try {
        const user = await User.findById(userId).select('-password -boards -createdAt -updatedAt').exec()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const handleUpdateUser = async (req, res) => {
    const userId = req.user._id

    if (!userId) {
        return res.status(403).json({
            message: "Provide UserId!"
        })
    }

    try {
        const user = await User.findByIdAndUpdate(userId, req.body).select('-password -boards').exec()
        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleDeleteUser = async (req, res) => {
    const userId = req.user._id

    if (!userId) {
        return res.status(403).json({
            message: "Provide UserId!"
        })
    }

    try {
        const user = await User.findByIdAndDelete(userId).select('-password -boards').exec()
        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const handleGetUserByToken = async (req, res) => {
    return res.status(200).json({
        user: req.user,
        "message": "valid user"
    })
}

module.exports = {
    handleCreateNewUser,
    handleGetAllUsers,
    handleSubmitInfo,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleLoginUser,
    handleGetUserByToken
}
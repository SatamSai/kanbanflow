
const { Router } = require('express')

const {
    handleCreateNewUser,
    handleGetAllUsers,
    handleGetUserById,
    handleLoginUser,
    handleGetUserByToken,
    handleSubmitInfo,
    handleUpdateUser,
    handleDeleteUser
} = require('../controllers/user.controllers');
const { verifyToken } = require('../middleware/auth');


const router = Router();

router.route('/')
    .get(verifyToken, handleGetAllUsers)

router.route('/submitInfo')
    .post(verifyToken, handleSubmitInfo)

router.route('/register')
    .post(handleCreateNewUser, handleLoginUser)

router.route('/login')
    .post(handleLoginUser)

router.route('/check-token')
    .get(verifyToken, handleGetUserByToken)

router.route('/:id')
    .get(verifyToken, handleGetUserById)
    .patch(verifyToken, handleUpdateUser)
    .delete(verifyToken, handleDeleteUser)

module.exports = {
    userRouter: router
}
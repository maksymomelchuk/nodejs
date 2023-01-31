const express = require('express')

const router = express.Router()

const {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
} = require('../../controller/authControllers')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

// Register
router.post('/register', asyncWrapper(registerController))
// Login
router.post('/login', asyncWrapper(loginController))
// Logout
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
// Get current user
router.get('/current', authMiddleware, asyncWrapper(currentUserController))
// Change subscription
router.patch('/', authMiddleware, asyncWrapper(changeSubscriptionController))

module.exports = { authRouter: router }

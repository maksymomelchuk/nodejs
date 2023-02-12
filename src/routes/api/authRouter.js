const express = require('express')

const router = express.Router()

const {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  uploadController,
  emailVerificationController,
  resendVerification,
} = require('../../controller/authControllers')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  authMiddleware,
  uploadMiddleware,
  resendVerificationMiddleware,
} = require('../../middlewares/authMiddleware')

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
// Update avatar
router.post(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(uploadController)
)
// Email verification
router.get(
  '/verify/:verificationToken',
  asyncWrapper(emailVerificationController)
)
// Resend verification email
router.post(
  '/verify',
  resendVerificationMiddleware,
  asyncWrapper(resendVerification)
)

module.exports = { authRouter: router }

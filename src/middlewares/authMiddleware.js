const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const { NotAuthorizedError, ValidationError } = require('../helpers/errors')
const User = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
      next(new NotAuthorizedError('Please, provide token'))
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)
    const { token: currentToken } = await User.findById(user._id)

    if (token !== currentToken) {
      next(new NotAuthorizedError('Please, login or provide correct token'))
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'))
  }
}
// Update avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./tmp'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const uploadMiddleware = multer({ storage })

const resendVerificationMiddleware = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    next(new ValidationError('missing required field email'))
  }
  next()
}

module.exports = {
  authMiddleware,
  uploadMiddleware,
  resendVerificationMiddleware,
}

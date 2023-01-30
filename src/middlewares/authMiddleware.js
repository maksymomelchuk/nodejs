const jwt = require('jsonwebtoken')
const { NotAuthorizedError } = require('../helpers/errors')
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

module.exports = {
  authMiddleware,
}

const jwt = require('jsonwebtoken')
const { NodeCustomError } = require('./errors.js')

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof NodeCustomError) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(500).json({ message: error.message })
}

const createToken = async (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  )

  return token
}

const parseToken = (req) => {
  return req.headers.authorization.split(' ')
}

module.exports = {
  asyncWrapper,
  errorHandler,
  createToken,
  parseToken,
}

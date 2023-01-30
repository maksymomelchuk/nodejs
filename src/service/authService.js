const User = require('../db/userModel')
const bcrypt = require('bcryptjs')
const { createToken } = require('../helpers/apiHelpers')

const { NotAuthorizedError } = require('../helpers/errors')

const register = async (email, password) => {
  const user = new User({
    email,
    password,
  })
  await user.save()

  const newToken = await createToken(user)
  user.token = newToken
  await user.save()

  const { email: userEmail, subscription, token } = user

  return { userEmail, subscription, token }
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotAuthorizedError(`No user with email'${email}' found`)
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong email or password')
  }

  const { email: userEmail, subscription } = user

  const newToken = await createToken(user)
  user.token = newToken
  await user.save()
  return { token: newToken, userEmail, subscription }
}

const logout = async (token) => {
  const user = await User.findOne({ token })

  if (!user) {
    throw new NotAuthorizedError('Unauthorized error')
  }
  user.token = ''
  const result = await user.save()
  return result
}

const current = async (token) => {
  const user = await User.findOne({ token })
  if (!user) {
    throw new NotAuthorizedError('Unauthorized error')
  }
  const { email, subscription } = user

  return { email, subscription }
}

const changeSubcription = async (token, body) => {
  const user = await User.findOne({ token })
  if (!user) {
    throw new NotAuthorizedError('Unauthorized error')
  }

  if (
    !body.subscription ||
    !['starter', 'pro', 'business'].includes(body.subscription)
  ) {
    throw new NotAuthorizedError('Please, provide valid subscription plan')
  }

  const newUser = await User.findOneAndUpdate({ token }, body, {
    new: true,
  })
  return newUser
}

module.exports = {
  register,
  login,
  logout,
  current,
  changeSubcription,
}

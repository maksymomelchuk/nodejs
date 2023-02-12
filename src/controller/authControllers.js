const { parseToken } = require('../helpers/apiHelpers')
const {
  register,
  login,
  logout,
  current,
  changeSubcription,
  updateAvatar,
  verificationConfirmation,
  resendVerificationMail,
} = require('../service/authService')

const registerController = async (req, res) => {
  const { email, password } = req.body
  const newUser = await register(email, password)

  res.status(201).json({ status: 'success', newUser })
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  const { token, userEmail, subscription } = await login(email, password)

  res.json({
    status: 'success',
    token,
    user: { email: userEmail, subscription },
  })
}

const logoutController = async (req, res) => {
  const [, token] = parseToken(req)
  await logout(token)

  res.status(204).json()
}

const currentUserController = async (req, res) => {
  const [, token] = parseToken(req)
  const user = await current(token)

  res.status(200).json({ status: 'success', user })
}

const changeSubscriptionController = async (req, res) => {
  const [, token] = parseToken(req)

  const user = await changeSubcription(token, req.body)
  res.status(200).json({ status: 'success', user })
}

const uploadController = async (req, res) => {
  const [, token] = parseToken(req)
  const { _id } = await current(token)

  const { avatarURL } = await updateAvatar(_id, req.file)

  res.status(200).json({ avatarURL })
}

const emailVerificationController = async (req, res) => {
  const { verificationToken } = req.params
  await verificationConfirmation(verificationToken)

  res.status(200).json({ status: 'Verification successful' })
}

const resendVerification = async (req, res) => {
  const { email } = req.body
  await resendVerificationMail(email)

  res.status(200).json({ status: 'Verification email sent' })
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  uploadController,
  emailVerificationController,
  resendVerification,
}

const User = require('../db/userModel')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs/promises')
const jimp = require('jimp')
const { createToken, isFolderExist } = require('../helpers/apiHelpers')

const { NotAuthorizedError } = require('../helpers/errors')

const register = async (email, password) => {
  const avatarURL = gravatar.url(email)
  const user = new User({
    email,
    password,
    avatarURL,
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
  const { email, subscription, _id } = user

  return { email, subscription, _id }
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

const updateAvatar = async (_id, file) => {
  // Check if file is exist
  if (!file) {
    throw new NotAuthorizedError('Please, provide file or correct headers')
  }
  const { path: temporaryName, originalname } = file
  // Default folder for avatars
  const storeImage = path.resolve('./public/avatars')
  // Define extension of file
  const extension = originalname.split('.')[originalname.split('.').length - 1]
  // Resize image
  const image = await jimp.read(temporaryName)
  image.resize(250, 250)
  await image.writeAsync(temporaryName)
  // Rename image
  const newName = `${_id}.${extension}`
  const filePath = path.join(storeImage, newName)
  // Check if folder is exist
  const isFolderAccessible = await isFolderExist(storeImage)
  if (!isFolderAccessible) {
    await fs.mkdir(storeImage, { recursive: true })
  }
  // Remove old avatar if exists
  const avatarDirectory = await fs.readdir(storeImage)
  const oldAvatar = avatarDirectory.find((el) => el.includes(_id))

  if (oldAvatar) {
    await fs.unlink(`${storeImage}/${oldAvatar}`)
  }

  // Transfer image from tmp to public/avatars folder
  await fs.rename(temporaryName, filePath)
  // Update Users avatarURL
  const newUser = await User.findOneAndUpdate(
    { _id },
    { avatarURL: filePath },
    { new: true }
  )
  return newUser
}

module.exports = {
  register,
  login,
  logout,
  current,
  changeSubcription,
  updateAvatar,
}

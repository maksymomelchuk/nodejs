const Contact = require('../db/contactModel')
const { NotFoundError } = require('../helpers/errors')

const getContacts = async (owner, { page, limit, favorite }) => {
  const data = await Contact.find({ owner })
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .find(favorite && { favorite })
  return data
}

const getContactById = async (_id, owner) => {
  const data = await Contact.findById({ _id, owner })
  if (!data) {
    throw new NotFoundError(`Contact with id ${_id} not found`)
  }
  return data
}

const removeContact = async (_id, owner) => {
  const data = await Contact.findByIdAndDelete({ _id, owner })
  if (!data) {
    throw new NotFoundError(`Contact with id ${_id} not found`)
  }
  return data
}

const addContact = async (body, owner) => {
  const data = new Contact({ ...body, owner })
  await data.save()
  return data
}

const updateContact = async (_id, body, owner) => {
  const data = await Contact.findById({ _id, owner })
  if (!data) {
    throw new NotFoundError(`Contact with id ${_id} not found`)
  }
  const newContact = await Contact.findByIdAndUpdate({ _id, owner }, body, {
    new: true,
  })
  return newContact
}

const patchContact = async (_id, body, owner) => {
  const data = await Contact.findById({ _id, owner })
  if (!data) {
    throw new NotFoundError(`Contact with id ${_id} not found`)
  }
  const newContact = await Contact.findByIdAndUpdate({ _id, owner }, body, {
    new: true,
  })
  return newContact
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
}

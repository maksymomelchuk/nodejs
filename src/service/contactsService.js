const Contact = require('../db/contactModel')
const { NotFoundError } = require('../helpers/errors')

const getContacts = async () => {
  const data = await Contact.find()
  return data
}

const getContactById = async (id) => {
  const data = await Contact.findById(id)
  if (!data) {
    throw new NotFoundError(`Contact with id ${id} not found`)
  }
  return data
}

const removeContact = async (id) => {
  const data = await Contact.findByIdAndDelete(id)
  if (!data) {
    throw new NotFoundError(`Contact with id ${id} not found`)
  }
  return data
}

const addContact = async (body) => {
  const data = await Contact.create(body)
  return data
}

const updateContact = async (id, body) => {
  const data = await Contact.findById(id)
  if (!data) {
    throw new NotFoundError(`Contact with id ${id} not found`)
  }
  await Contact.findByIdAndUpdate(id, body)
}

const patchContact = async (id, body) => {
  const data = await Contact.findById(id)
  if (!data) {
    throw new NotFoundError(`Contact with id ${id} not found`)
  }
  await Contact.findByIdAndUpdate(id, body)
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
}

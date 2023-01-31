const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  patchContact,
  updateContact,
} = require('../service/contactsService')

// Get all contacts
const get = async (req, res, next) => {
  const { _id } = req.user

  const results = await getContacts(_id, req.query)
  res.json(results)
}
// Get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params
  const { _id } = req.user
  const contact = await getContactById(contactId, _id)

  return res.json(contact)
}
// Delete contact by id
const remove = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user
  await removeContact(contactId, _id)

  return res.json({ message: `Contact with id '${contactId}' deleted` })
}
// Create contact
const create = async (req, res, next) => {
  const { _id } = req.user
  const newContact = await addContact(req.body, _id)

  return res.status(201).json(newContact)
}
// Update contact
const update = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user
  const newContact = await updateContact(contactId, req.body, _id)

  return res.status(200).json(newContact)
}
// Patch contact
const patch = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  const newContact = await patchContact(contactId, req.body, _id)

  return res.status(200).json(newContact)
}

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  patch,
}

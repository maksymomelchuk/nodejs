const service = require('../service/contactsService')

// Get all contacts
const get = async (req, res, next) => {
  const results = await service.getContacts()
  res.json(results)
}
// Get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await service.getContactById(contactId)

  return res.json(contact)
}
// Delete contact by id
const remove = async (req, res, next) => {
  const { contactId } = req.params
  await service.removeContact(contactId)

  return res.json({ message: `Contact with id '${contactId}' deleted` })
}
// Create contact
const create = async (req, res, next) => {
  const newContact = await service.addContact(req.body)

  return res.status(201).json(newContact)
}
// Update contact
const update = async (req, res, next) => {
  const { contactId } = req.params

  await service.updateContact(contactId, req.body)
  const newContact = await service.getContactById(contactId)

  return res.status(200).json(newContact)
}
// Patch contact
const patch = async (req, res, next) => {
  const { contactId } = req.params
  await service.patchContact(contactId, req.body)
  const newContact = await service.getContactById(contactId)

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

const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('./models/contacts.json')
const readContacts = () => fs.readFile(contactsPath, 'utf-8')
const writeContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8')
// Get all contacts
const listContacts = async () => {
  const contacts = await readContacts()
  return JSON.parse(contacts)
}
// Get contact by Id
const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((item) => {
    return item.id === contactId
  })
  return contact
}
// Delete contact
const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const deletedContact = contacts.find((item) => item.id === contactId)
  const newContacts = contacts.filter((item) => item.id !== contactId)
  if (!deletedContact) {
    return
  }
  writeContacts(newContacts)
  return deletedContact
}
// Add contact
const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = {
    id: uuidv4(),
    ...body,
  }
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}
// Update contact
const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body

  contacts.forEach((item) => {
    if (item.id === contactId) {
      item.name = name
      item.email = email
      item.phone = phone
    }
  })

  await writeContacts(contacts)
  return { contactId, ...body }
}
// Patch contact
const patchContact = async (contactId, body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body
  contacts.forEach((item) => {
    if (item.id === contactId) {
      if (name) {
        item.name = name
      }
      if (email) {
        item.email = email
      }
      if (phone) {
        item.phone = phone
      }
    }
  })
  await writeContacts(contacts)
  const updatedContact = contacts.find((el) => el.id === contactId)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
}

const express = require('express')

const router = express.Router()

const {
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} = require('../../models/contacts')

const ctrlContact = require('../../controller/index')

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validation')

// Get all contacts
router.get('/', ctrlContact.get)
// Get contact by id
router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    return res.status(200).json(contact)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})
// Delete contact by id
router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params
    const contact = await removeContact(contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    return res
      .status(200)
      .json({ message: `Contact with id '${contactId}' deleted` })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})
// Add contact
router.post('/', addContactValidation, async (req, res) => {
  try {
    const newContact = await addContact(req.body)

    return res.status(201).json(newContact)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})
// Update contact
router.put('/:contactId', addContactValidation, async (req, res) => {
  try {
    const { contactId } = req.params
    const { name, email, phone } = req.body
    if (name && email && phone) {
      const newContact = await updateContact(contactId, req.body)
      return res.status(200).json(newContact)
    }
    return res.status(400).json({ message: 'Missing fields' })
  } catch (error) {
    return res.status(404).json({ message: 'Contact not found' })
  }
})
// Patch contact
router.patch('/:contactId', updateContactValidation, async (req, res) => {
  try {
    const { contactId } = req.params
    const { name, email, phone } = req.body
    if (name || email || phone) {
      const newContact = await patchContact(contactId, req.body)
      return res.status(200).json(newContact)
    }
    return res.status(404).json({ message: 'Nothing to update' })
  } catch (error) {
    return res.status(404).json({ message: 'Contact not found' })
  }
})

module.exports = router

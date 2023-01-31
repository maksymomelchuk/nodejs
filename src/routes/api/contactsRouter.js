const express = require('express')

const router = express.Router()

const {
  get,
  getById,
  remove,
  create,
  update,
  patch,
} = require('../../controller/contactsControllers')

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/validation')

const { authMiddleware } = require('../../middlewares/authMiddleware')

const { asyncWrapper } = require('../../helpers/apiHelpers')

//
router.use(authMiddleware)
// Get all contacts
router.get('/', asyncWrapper(get))
// Get contact by id
router.get('/:contactId', asyncWrapper(getById))
// Delete contact by id
router.delete('/:contactId', asyncWrapper(remove))
// Add contact
router.post('/', addContactValidation, asyncWrapper(create))
// Update contact
router.put('/:contactId', addContactValidation, asyncWrapper(update))
// Patch contact
router.patch('/:contactId', updateContactValidation, asyncWrapper(patch))

module.exports = { contactsRouter: router }

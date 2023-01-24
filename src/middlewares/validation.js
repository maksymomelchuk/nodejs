const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

// Validation for all contact fields
const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string().min(7).max(15).required(),
    favorite: Boolean,
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details))
  }
  next()
}
// Validation for patch contact
const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Boolean,
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    next(
      new ValidationError(
        'Only favorite field possible to update with patch method'
      )
    )
  }

  next()
}

module.exports = {
  addContactValidation,
  updateContactValidation,
}

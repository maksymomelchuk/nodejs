const Joi = require('joi')

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
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
  }

  next()
}

const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string().min(7).max(15),
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
  }

  next()
}

module.exports = {
  addContactValidation,
  updateContactValidation,
}

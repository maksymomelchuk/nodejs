const Contact = require('./schemas/contact')

const listContacts = async () => {
  return Contact.find()
}

module.exports = {
  listContacts,
}

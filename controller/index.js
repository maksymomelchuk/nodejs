const service = require('../service/index')

const get = async (req, res, next) => {
  try {
    const results = await service.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  get,
}

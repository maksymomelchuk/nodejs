const mongoose = require('mongoose')

const uriDb = process.env.DB_HOST

const mongooseConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connection to database is successful')
  } catch (error) {
    console.log(error.message)
    process.exit(0)
  }
}

module.exports = mongooseConnect

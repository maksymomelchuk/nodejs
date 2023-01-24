require('dotenv').config()
const mongooseConnect = require('./src/db/connection')
const app = require('./src/app')

const PORT = process.env.PORT || 3000

const start = () => {
  try {
    mongooseConnect()
    app.listen(PORT, (error) => {
      if (error) {
        console.log(`Server launch error: ${error}`)
      }
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`)
  }
}

start()

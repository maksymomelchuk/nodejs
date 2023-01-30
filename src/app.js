const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./helpers/apiHelpers')

const app = express()

const { contactsRouter } = require('./routes/api/contactsRouter')
const { authRouter } = require('./routes/api/authRouter')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json())
app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
app.use(logger(formatsLogger))
app.use(cors())

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app

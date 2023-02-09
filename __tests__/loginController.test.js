// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')
// dotenv.config()
// const User = require('../src/db/userModel')
// const { loginController } = require('../src/controller/authControllers')
// const { login } = require('../src/service/authService')

// describe('Login Controller test', async () => {
//   it('Should return status 200, token and users email and subscription', () => {
//     const user = {
//       _id: '63e38759fc32a8ad0959633e',
//       email: 'test777@in.com',
//       subscribtion: 'starter',
//       token: '',
//       createdAt: new Date().getTime(),
//     }

//     const mockReq = {
//       body: {
//         email: 'test777@in.com',
//         password: '123',
//       },
//     }

//     const mockRes = ''

//     const token = jwt.sign(
//       {
//         _id: user._id,
//       },
//       process.env.JWT_SECRET
//     )

//     jest.spyOn(User, 'findOne').mockImplementationOnce(async () => user)
//     jest.spyOn(User, 'createToken').mockImplementationOnce(() => token)
//     jest.spyOn(User, 'save').mockImplementationOnce(async () => {})

//     // expect()
//   })
// })

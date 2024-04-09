// const express = require('express')

// const router = express.Router()

// const user = require('../services/user')
// const { sendMail } = require('../utils/sendMail')

// router.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'ok',
//     server: 'alive'
//   })
// })

// router.post('/signup', async (req, res) => {
//   const { fullName, email, password } = req.body

//   if (!fullName || !email || !password) {
//     res.status(400).json({
//       error: 'one or more field is not filled'
//     })
//   } else {
//     const data = {
//       fullName,
//       email,
//       password
//     }
//     const newUser = await user.create(data)
//     if (newUser[1]) {
//       newUser[1].password = password
//       res.status(201).json(JSON.stringify(newUser))
//     } else {
//       res.status(400).json(JSON.stringify(newUser))
//     }
//   }
// })

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     res.status(401).json(
//       JSON.stringify({
//         error: 'email or  pasword must not be empty'
//       })
//     )
//   } else {
//     const data = {
//       email,
//       password
//     }
//     const findUser = await user.validate(data)

//     if (findUser[0]) {
//       res.status(200).json(JSON.stringify(findUser))
//     } else if (findUser[0] === 'google user') {
//       res.status(401).json(
//         JSON.stringify({
//           error: findUser[1]
//         })
//       )
//     } else {
//       res.status(401).json(
//         JSON.stringify({
//           error: 'invalid email or password '
//         })
//       )
//     }
//   }
// })

// router.get('/user', async (req, res) => {
//   const { userid } = req.query
//   if (!userid) {
//     res.status(401).json({
//       error: 'userId required'
//     })
//   }
//   const getUser = await user.getById(userid)
//   res.status(200).json(getUser)
// })

// router.post('/reset-password', async (req, res) => {
//   const { email } = req.body

//   if (!email) {
//     res.status(400).json({
//       error: 'Email is required'
//     })
//   } else {
//     try {
//       const existingUser = await user.getByEmail(email)
//       if (!existingUser) {
//         res.status(404).json({
//           error: 'User not found'
//         })
//       } else {
//         const resetLink = 'https://example.com/reset-password'
//         await sendMail(existingUser.email, existingUser.fullName, resetLink)
//         res.status(200).json({
//           message: 'Password reset email sent successfully'
//         })
//       }
//     } catch (error) {
//       console.error('Error occurred:', error)
//       res.status(500).json({
//         error: 'Internal server error'
//       })
//     }
//   }
// })




// module.exports = router






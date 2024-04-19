// const Mailjet = require('node-mailjet')
// const config = require('dotenv').config()

// const mailjet = Mailjet.apiConnect(
//   config.MJ_APIKEY_PUBLIC,
//   config.MJ_APIKEY_PRIVATE
// )

// /**
//  * Sends an email to the user
//  * @param {string} userEmail - The email of the user
//  * @param {string} userName - The user's name
//  * @param {string} subject - The subject of the email
//  * @param {string} htmlContent - The HTML content of the email
//  */
// const sendMail = (userEmail, userName, subject, htmlContent) => {
//   const request = mailjet.post('send', { version: 'v3.1' }).request({
//     Messages: [
//       {
//         From: {
//           Email: 'bowaleadetunji@gmail.com',
//           Name: 'SCHOOLBASE team'
//         },
//         To: [
//           {
//             Email: userEmail,
//             Name: userName
//           }
//         ],
//         Subject: subject,
//         HTMLPart: htmlContent
//       }
//     ]
//   })

//   request
//     .then((result) => {
//       // console.log(result.Email)
//     })
//     .catch((err) => {
//       console.error(err.statusCode)
//     })
// }

// module.exports = {
//   sendMail
// }

const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'katashisasaki318@gmail.com',
    pass: `${process.env.APP_PASSWORD}`
  }
})

async function sendMail (recipient, subj, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: 'katashisasaki318@gmail.com', // sender address
      to: recipient,
      subject: subj, // Subject line
      html: htmlContent
    })
    console.log('Mail Sent to: ' + info.accepted)
  } catch (error) {
    console.log(error)
    return error.message
  }
}

module.exports = sendMail

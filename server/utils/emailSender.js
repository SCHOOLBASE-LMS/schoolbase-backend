// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const emailSender = async (userEmail, userName, message) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"SCHOOLBASE team" <oreoluwaajayyiruth@gmail.com>`,
//       to: `${userName} <${userEmail}>`,
//       subject: "Password reset Request",
//       html: `<h3>Dear ${userName}</h3> <br>
//         <p>You just requested for your password to be changed. Kindly click the following link:</p> <br>  
//         <strong><a href="${message}">Reset password</a></strong>
//         to reset password. Link is active for 30mins and can only be used once.
//         <br><br> Best Regards <br> <br> Ignore if you didn't request this email <br><br> lifePlusAOB team`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.response);
//   } catch (error) {
//     if (error.code === "EAUTH") {
//       console.error("Authentication failed. Check your email and password.");
//     } else if (error.code === "ECONNECTION") {
//       console.error("Failed to connect to the SMTP server.");
//     } else {
//       console.error("An error occurred:", error);
//     }
//     throw new Error("Failed to send email");
//   }
// };

// module.exports = emailSender;

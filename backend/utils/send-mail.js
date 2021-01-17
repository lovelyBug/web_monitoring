const nodemailer = require('nodemailer')
const userEmail = 'lovelybug@126.com'
const sendEmail = 'changlingfei@huice.com'

const transporter = nodemailer.createTransport({
  service: '126',
  secureConnection: false,
  auth: {
    user: userEmail,
    pass: 'MUVVISFVKGUYOUCB',
  },
})

async function sendMail(subject, text, html) {
  const mailOptions = {
    from: userEmail,
    cc: userEmail, // 抄送
    to: sendEmail,
    subject, // 主题
    text,
    html
  }
  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (err) {
    console.log('email error', err)
    return false
  }
}

module.exports = sendMail

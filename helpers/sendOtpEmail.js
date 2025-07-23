const nodemailer = require('nodemailer');

module.exports = async function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"UrbanFarm" <no-reply@urbanfarm.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
};

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ecosyncinfo@gmail.com",
    pass: "vglg zlic vtmo emqo",
  },
});

exports.sendPasswordResetToken = (email, token, callback) => {
  const mailOptions = {
    from: 'ecosyncinfo@gmail.com',
    to: email,
    subject: 'Password Reset Token',
    html: `<p>Your token is:</p>
      <p>${token}</p>
      <p>This token will expire in 5 minutes.</p>`
  };

  transporter.sendMail(mailOptions, callback);
};
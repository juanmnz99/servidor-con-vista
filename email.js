

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tucorreo@gmail.com', 
    pass: 'tupassword', 
  },
});

exports.sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'tucorreo@gmail.com', 
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        reject(error);
      } else {
        console.log('Correo enviado con éxito:', info.response);
        resolve(info);
      }
    });
  });
};

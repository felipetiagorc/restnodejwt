const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mail.json');

let transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: { user, pass },
  logger: true,
  debug: true,
  tls: { rejectUnauthorized: false }
});

transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server ready to take our message');
  }
});
// // config do handlebars, usando o transport do nodemailer:
// transport.use(
//   'compile',
//   hbs({
//     viewEngine: 'handlebars',
//     //onde ficam todas nossas templates de email:
//     viewPath: path.resolve('./src/resources/mail/'),
//     extName: '.html', // nao vamos usar PUG ou algo assim.
//   }
//   )
//   );

// coment

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/auth'),
    layoutsDir: path.resolve('./src/resources/mail/auth'),
    defaultLayout: 'esqueceu_senha.html'
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
};

transport.use('compile', hbs(handlebarOptions));

// coment

module.exports = transport;

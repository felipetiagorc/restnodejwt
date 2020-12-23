const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

module.exports = transport;

// config do handlebars, usando o transport do nodemailer:
transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/'),
    },
    //onde ficam todas nossas templates de email:
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html', // nao vamos usar PUG ou algo assim.
  })
);

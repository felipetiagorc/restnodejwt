const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
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
    defaultLayout: 'esqueceu_senha.html',
},
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
};

transport.use('compile', hbs(handlebarOptions));


// coment



  module.exports = transport;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../../config/auth.json');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const router = express.Router();

// gerar token JWT sign (3 params: id unico + hash secreto + tempo expiração)
function geraToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post('/registrar', async (req, res) => {
  //pega email dos params para verificar:
  const { email } = req.body;

  try {
    // verificar se já tem o mesmo email:
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já está cadastrado!' });

    // cria um usário com os dados de req.body
    const user = await User.create(req.body);

    // apoaga a senha assim que user for criado:
    // com isso não retorna a senha como resposta do POST
    user.senha = undefined;

    // aqui quando cria o usuário ja repassa o token pra ele logar automaticamente:
    return res.send({ user, token: geraToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Registro Falhou!' });
  }
});

router.post('/autenticar', async (req, res) => {
  const { email, senha } = req.body;
  // precisamos da senha do banco aqui para comparar com a digitada:
  // como o model User tem 'senha' com 'select=false' precisa desse '.select('+senha'):
  const user = await User.findOne({ email }).select('+senha');
  if (!user) return res.status(400).send({ error: 'Usuário não cadastrado' });
  //compara a senha, decript com 'bcrypt.compare', se não bate:
  if (!(await bcrypt.compare(senha, user.senha)))
    return res.status(400).send({ error: 'Senha não confere' });

  // com isso não retorna a senha como resposta do POST
  user.senha = undefined;

  // depois que registra geralmente tem confirmação por email depois tem que logar denovo, aqui não..
  // estamos passando para uma função geraToken:

  // se logou:
  res.send({ user, token: geraToken({ id: user.id }) });
});

router.post('/esqueceu_senha', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Usuário não encontrado' });
    // gerar token aleatório, pq não é qq pessoa que pode acessar lá e resetar a senha: só esse user por certo tempo:
    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    // data de expiração: a hora de agora + 1h
    now.setHours(now.getHours() + 1);

    // aqui ta inserindo na tabela users: o token e a data de expiração:
    await User.findByIdAndUpdate(user.id, {
      // set = quais campos queremos setar:
      $set: {
        //tipo String
        senhaResetToken: token,
        //tipo Data
        senhaResetExpiracao: now
      }
    });
    console.log(token, now);

    mailer.sendMail(
      {
        to: email,
        from: 'fe21@fe21.com',
        template: '/auth/esqueceu_senha',
        // no context passamos as variaveis que temos no template:
        // a data de expiração não precisa passar pq vamos verificar lá na hora de passar a senha mesmo
        context: { token }
      },
      err => {
        if (err) console.log(err);
        return res
          .status(400)
          .send({ error: 'Não pudemos enviar o email com a senha' });
        // se não der erro: retorna o 200 ok.. pq naõ tem outra resposta agora, mas pode por msg:
        // return res.send();
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ error: 'Erro na recuperação da senha, tente denovo' });
  }
});

// esse (app) vem 'injetado' de '/src/index.js':
// aqui estamos passando o 'router' para o app com o prefixo '/auth'
// todas rotas terao o prefixo '/auth' depois vem o {router}:
module.exports = app => app.use('/auth', router);

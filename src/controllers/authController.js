const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const router = express.Router();

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

    return res.send({ user });
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
  // se logou:
  res.send({ user });
});

// esse (app) vem 'injetado' de '/src/index.js':
// aqui estamos passando o 'router' para o app com o prefixo '/auth'
// todas rotas terao o prefixo '/auth' depois vem o {router}:
module.exports = app => app.use('/auth', router);

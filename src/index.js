const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');

const app = express();
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// estou requisitando o arquivo auth e repassando para ele o (app)
// pq 'app' é um objeto definido uma vez e utilizado em toda aplicacao.
require('./app/controllers/index')(app);
app.listen(3001);
console.log('Rodando na porta 3001');

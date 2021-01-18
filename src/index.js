const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// estou requisitando o arquivo auth e repassando para ele o (app)
// pq 'app' é um objeto definido uma vez e utilizado em toda aplicacao.
require('./app/controllers/index')(app);
app.listen(3000);

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// estou requisitando o arquivo auth e repassando para ele o (app)
// pq 'app' é um objeto definido uma vez e utilizado em toda aplicacao.
require('./controllers/authController.js')(app)

app.listen(3000)

const fs = require('fs');
const path = require('path');

// este arquivo 'controllers/index' serve para
// não ter que importar cada um dos controllers individ. no arquivo 'src/index.js'

module.exports = app => {
  // lê todos arquivos do diretorio base:
  fs.readdirSync(__dirname)
    // filtra arquivos que não começam com '.', seja diferente de Zero , e que não chame 'index.js':
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    // percorre e da require em cada arquivo | e passa o (app) pra cada um deles:
    .forEach(file => require(path.resolve(__dirname, file))(app));
};

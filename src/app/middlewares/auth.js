const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

//se ta pronto para o proximo passo é só se eu chamar o next().. senão ele para...
module.exports = (req, res, next) => {
  const authHeader = req.headers.autorizacao;

  if (!authHeader) return res.status(401).send({ error: 'Falta o token' });

  const parts = authHeader.split(' ');
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Erro no token' });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });
    req.userId = decoded.id;
    return next();
  });
};

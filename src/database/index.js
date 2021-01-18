//conecta no mongoDB

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/nodeRest';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// isso é padrão para todo projeto:
mongoose.Promise = global.Promise;

module.exports = mongoose;

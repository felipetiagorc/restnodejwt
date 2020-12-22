//conecta no mongoDB

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/nodeRest';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

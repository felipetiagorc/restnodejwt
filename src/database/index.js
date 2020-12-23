//conecta no mongoDB

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/nodeRest';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

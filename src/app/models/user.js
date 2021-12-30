const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  senha: {
    type: String,
    require: true,
    // select:false = quando buscar usuarios não vem a senha:
    select: false,
  },
  senhaResetToken: {
    type: String,
    select: false,
  },
  senhaResetExpiracao: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// antes de salvar, criptografa a senha 10x:
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});
const User = mongoose.model('User', UserSchema);

module.exports = User;

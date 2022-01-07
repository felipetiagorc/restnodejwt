const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// antes de salvar, criptografa a senha 10x:
ProjectSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

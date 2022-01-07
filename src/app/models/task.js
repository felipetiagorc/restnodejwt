const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
    title: {
    type: String,
    require: true,
  }, 
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
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
TaskSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

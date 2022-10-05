const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const Project = require('../models/project');
const Task = require('../models/task');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    return res.send({projects})

  } catch (error) {
    return res.status(400).send({error: "Erro ao carregar Projeto"})
  }
});

router.get('/:projectId', async (req, res) => {
  res.send({ user: req.userId }); 
});

router.post('/', async(req, res) => {
  try {
    const {title, description, tasks} = req.body;
    // cria o projeto
    const project = await Project.create({title, description, user: req.userId});
    // depois cria as tasks
    tasks.map(task => {
      const projectTask = new Task({...task, project: project._id})
      projectTask.save().then(task => project.tasks.push(task));
    })
    await project.save(); 

    return res.send({project});
          
  } catch (error) {
    return res.status(400).send({error: "Erro ao criar novo Projeto"})
    
  }

});

router.put('/:projectId', async(req, res) => {
  res.send({user: req.userId });
});

router.delete('/:projectId', async(req, res) => {
  res.send({ user: req.userId });
});

module.exports = app => app.use('/projects', router);

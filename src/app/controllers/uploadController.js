const express = require('express');
const multer = require('multer');
const upload = require('../../config/multerConfig');
const router = express.Router();

// router.get('/', async (req, res) => {
//   return res.json({
//     erro: false,
//     mensagem: 'Upload realizado'
//   });
// });

// o multer executa o parser, conforme 'multerConfig.js'
router.post('/', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('req.file: ', req.file);

    return res.json({
      erro: false,
      mensagem: 'Upload realizado',
      arquivo: req.file.filename
    });
  }
  return res.status(400).json({
    erro: true,
    mensagem: 'Erro no upload'
  });
});

module.exports = app => app.use('/upload-image', router);

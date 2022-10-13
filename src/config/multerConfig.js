const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // onde salvar o arquivo
      callback(null, './src/public/uploads');
    },
    filename: (req, file, callback) => {
      const time = new Date().getTime();

      callback(null, `${time}_${file.originalname}`);
    }
  }),
  limits: {
    // 2.097.152 bytes:
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
      formatoAceito => formatoAceito == file.mimetype
    );

    if (extensaoImg) {
      return callback(null, true);
    }
    // se imagem invalida:
    return callback(null, false);
  }
});

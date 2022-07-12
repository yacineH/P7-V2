//import du module multer
const multer = require('multer');

//definition des types mimes des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//configuration de multer avec le repertoir images
//avec systeme de nommage des fichiers stockées sur le disque
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0].split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//export du module multer
//attention image doit etre pareil au nom de param du fichier dans le post
module.exports = multer({storage: storage}).single('image');
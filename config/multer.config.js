const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + uniqid() + path.extname(file.originalname))
    }
})


const upload = multer({storage: storage});

exports.upload = (field) => upload.single(field);
const fs = require("fs");
const path = require("path");
const multer = require('multer');

//Este se usa unicamente para avatars
// ************ Controller Require ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/avatars");
    },
    filename: function (req, file, cb) {
    cb (null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
}

});

// ************************
const upload = multer({ storage: storage });
// ************************

module.exports = upload;
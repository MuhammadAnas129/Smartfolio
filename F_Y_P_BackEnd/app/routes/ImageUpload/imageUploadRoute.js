const  express = require('express');

const router = express.Router();
const controller = require("../../controllers/ImageUpload/imageUpload")
const auth =require('../../middlewares/auth')
const multer = require('multer');
const fs = require('fs').promises;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({
    storage: storage
})

router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        return res.json({
            status: true,
            message: 'Uploaded',
            result: req.file.path
        })
    } else {
        return res.json({
            status: false,
            message: 'No image found'
        })
    }
})
module.exports= router
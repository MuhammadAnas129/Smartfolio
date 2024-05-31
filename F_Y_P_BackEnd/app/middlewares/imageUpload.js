const express = require('express');
const multer = require('multer');
const app = express();
const fs= require('fs')

// Define storage for hairStyles images
const hairStylesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
     if(req.body.image_type === 'user_profile_image'){
      const dir = './user_profile_images/';

      if(!fs.existsSync(dir)){
          fs.mkdirSync(dir, {recursive:true});
      }
      cb(null , dir)
  }
  else if(req.body.image_type === 'resume_template_image'){
    const dir = './resume_template_images/';

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive:true});
    }
    cb(null , dir)
}
else if(req.body.image_type === 'blog_image'){
  const dir = './blog_images/';

  if(!fs.existsSync(dir)){
      fs.mkdirSync(dir, {recursive:true});
  }
  cb(null , dir)
}
    else {
      cb(new Error('Invalid image type or format'));
    }
  },
  filename:function(req,file,cb){
    cb(null ,Date.now() + "--" + file.originalname)
}
});

// Define upload middleware for hairStyles images
const hairStylesUpload = multer({
  storage: hairStylesStorage,
 
}).single('image');


module.exports = hairStylesUpload;
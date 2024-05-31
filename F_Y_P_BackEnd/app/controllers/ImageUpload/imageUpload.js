const { pool } = require("../../config/db.config");

exports.uploadImage = async (req, res) => {
  try {
    if (req.file.path) {
      res.status(200).json({
        message: "Image uploaded in particular folder",
        image_url: req.file.path,
        status: true,
      });
    }
  } catch (err) {
    res.json(err);
  }
};

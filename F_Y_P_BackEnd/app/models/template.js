const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true
  },
  templateImage: {
    type: String,
    required: true
  }
});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;

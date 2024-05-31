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

const PortfolioTemplate = mongoose.model('PortfolioTemplate', templateSchema);
module.exports = PortfolioTemplate;

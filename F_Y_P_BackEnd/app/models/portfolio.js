const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  templatesFontFamily: { type: String, default: "poppins" },
  changeColor: { type: String, default: "#3870B1" },
  currentState: { type: String, default: "skill" },
  portfolioName : String,
  objectives: String,
  personalInformation: {
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
  },
  projectInformation: [
    {
      title: String,
      image: String,
      started_from: String,
      ended_at: String,
      description: String,
      link: String,
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
module.exports = Portfolio;

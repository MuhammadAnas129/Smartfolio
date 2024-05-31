const express = require("express");
const controller = require("../../controllers/main/portfolioTemplateController")
const multer = require("multer");
const upload = multer({ dest: 'uploads/templates' });
const portfolioTemplateRoute = express.Router();

portfolioTemplateRoute.post("/post-portfolio-template", upload.single('image'), controller.postPortfolio);
portfolioTemplateRoute.get("/get-portfolio-template", controller.getAllPortfolios);
portfolioTemplateRoute.delete("/delete-portfolio-template", controller.deletePortfolio);
module.exports = portfolioTemplateRoute;
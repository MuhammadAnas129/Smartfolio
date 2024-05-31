const express = require("express");
const controller = require("../../controllers/Main/educationController")
const educationRouter = express.Router();

educationRouter.post("/add-education", controller.addEducation);
educationRouter.put("/update-education" ,controller.updateEducation);
educationRouter.delete("/delete-education", controller.deleteEducation);
educationRouter.get("/get-all-education");
educationRouter.get("/get-user-education", controller.getUserEducation);
educationRouter.put("/add-user-education", controller.addUserEducation);
educationRouter.get("/get-education-by-id",controller.getEducationById);

module.exports = educationRouter;
const express = require("express");
const controller = require("../../controllers/Main/experienceController")
const workExperienceRouter = express.Router();

workExperienceRouter.post("/add-work-experience", controller.addWorkExperience);
workExperienceRouter.put("/edit-experience",controller.editWorkExperience);
workExperienceRouter.delete("/delete-experience",controller.deleteWorkExperience);
workExperienceRouter.get("/get-all-workExperience", controller.getAllWorkExperience);
workExperienceRouter.get("/get-user-workExperience", controller.getUserWorkExperience);
workExperienceRouter.put("/add-user-workExperience", controller.addUserExperience);
workExperienceRouter.get("/get-workExperience-by-id", controller.getWorkExperienceById);

module.exports = workExperienceRouter;
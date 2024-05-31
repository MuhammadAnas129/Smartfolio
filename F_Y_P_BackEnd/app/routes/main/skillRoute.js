const express = require("express");
const controller = require("../../controllers/Main/skillController")
const skillsRouter = express.Router();

skillsRouter.post("/add-skill", controller.addSkill);
skillsRouter.put("/edit-skill", controller.editSkill);
skillsRouter.delete("/delete-skill", controller.deleteSkill);
skillsRouter.get("/get-all-skills");
skillsRouter.get("/get-user-skills", controller.getUserSkill);
skillsRouter.get("/get-skills-by-id", controller.getSkillById);

module.exports = skillsRouter;
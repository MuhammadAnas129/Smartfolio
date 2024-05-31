const express = require("express");
const controller = require("../../controllers/Main/objectiveControlller")
const objectivesRouter = express.Router();

objectivesRouter.post("/add-objective", controller.addObjective);
objectivesRouter.put("/update-objective", controller.updateObjective);
objectivesRouter.delete("/delete-objective", controller.deleteObjective);
objectivesRouter.get("/get-all-objectives", controller.getAllObjective);
objectivesRouter.get("/get-user-objectives", controller.getUserObjective);
objectivesRouter.get("/get-objectives-by-id", controller.getObjectiveById);

module.exports = objectivesRouter;
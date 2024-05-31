const express = require("express");
const controller = require("../../controllers/Main/contact_detailsController")
const personalInfoRouter = express.Router();

personalInfoRouter.post("/add-persona-info", controller.addPersonalInfo);
personalInfoRouter.put("/edit-persona-info",controller.editPersonalInfo);
personalInfoRouter.delete("/delete-persona-info" , controller.deletePersonalInfo);
personalInfoRouter.get("/get-all-personalInfo", controller.getAllPersonalInfo);
personalInfoRouter.get("/get-user-personalInfo", controller.getUserPersonalInfo);
personalInfoRouter.get("/get-personalInfo-by-id", controller.getPersonalInfoById);

module.exports = personalInfoRouter;
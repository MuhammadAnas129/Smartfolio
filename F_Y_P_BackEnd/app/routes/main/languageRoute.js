const express = require("express");
const controller = require("../../controllers/Main/languageController");
const languagesRouter = express.Router();

languagesRouter.post("/add-language", controller.addLanguage);
languagesRouter.put("/update-language", controller.updateLanguage);
languagesRouter.delete("/delete-language", controller.deleteLanguage);
languagesRouter.get("/get-all-languages", controller.getAllLanguage);
languagesRouter.get("/get-user-languages", controller.getUserLanguage);
languagesRouter.get("/get-languages-by-id", controller.getLanguageById);

module.exports = languagesRouter;
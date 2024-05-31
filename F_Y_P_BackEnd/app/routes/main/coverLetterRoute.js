var router = require("express").Router();
var controller= require("../../controllers/main/coverLetterController");

router.post("/add", controller.add);
router.delete("/delete", controller.delete);
router.put("/update", controller.update);
router.get("/get", controller.get);


module.exports = router;
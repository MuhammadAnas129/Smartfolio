const router = require("express").Router()
const controller = require("../../controllers/main/imageToTextController")

router.get("/", controller.imageToText)

module.exports = router
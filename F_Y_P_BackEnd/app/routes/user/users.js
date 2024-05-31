var router = require("express").Router();
var { signup, login } = require("../../controllers/user/userController");

router.post("/signup", signup);
router.post("/login", login); 


module.exports = router;
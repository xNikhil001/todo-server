const router = require('express').Router();
const {loginUser,addUser,logout} = require('./controller.js');

router.post("/login",loginUser);
router.post("/register",addUser);
router.get("/logout",logout);

module.exports = router;
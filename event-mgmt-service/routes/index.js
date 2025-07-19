const express = require('express'); 
const router = express.Router(); 
const Auth = require("../controllers/auth.controllers"); 

//Auth API 
 
router.post('/register',Auth.register); 
router.post('/login',Auth.login); 
router.put("/update/:primaryid", Auth.updateUser); 
module.exports = router; 
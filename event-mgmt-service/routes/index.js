const express = require('express'); 
const router = express.Router(); 
const Auth = require("../controllers/auth.controllers"); 
const Event = require("../controllers/event.controllers");
const Enroll = require("../controllers/enroll.controllers");
const Users = require("../controllers/users.controllers");

//Auth API 
 
router.post('/register',Auth.register); 
router.post('/login',Auth.login); 
router.put("/update/:primaryid", Auth.updateUser); 

router.post("/event/add", Event.add)
router.get("/event/list", Event.list)
router.get("/event/:id", Event.getEvent)
router.put("/event/:id", Event.updateEvent)
// Enroll controller API
router.post("/event/:eventId/enroll", Enroll.add);
router.get("/event/:eventId/list", Enroll.list);
router.get("/event/:eventId/enroll/:enrollId", Enroll.getEnroll);
router.put("/event/:eventId/enroll/:enrollId", Enroll.updateEnroll);
// Report API
router.get("/report/enroll/all", require("../controllers/report.controllers").getAllEnrolls);
// User API
router.get("/user/list", Users.list);
router.get("/user/:id", Users.getUser);
router.put("/user/:id", Users.updateUser);
module.exports = router; 
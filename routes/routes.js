const express = require('express')
const router = express.Router();

const mongoCtrl = require('../controllers/mongoCtrl.js')
const notificationCtrl = require('../controllers/notificationCtrl.js')


//mongodb
router.post('/subcribirse',mongoCtrl.deleteUser,mongoCtrl.createUser)
router.put('/updateUser',mongoCtrl.updateUser)

//wepush
router.post('/sendOne',notificationCtrl.pusSMG) 


module.exports = router
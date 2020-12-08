const express = require('express')
const router = express.Router();

const mongoCtrl = require('../controllers/mongoCtrl.js')

//const notificatioController = require('../controllers/notification.js')
//const administrationController = require('../controllers/administration.js')


//router.get('/SMGpost',notificatioController.pusSMG)
//router.get('/genVapy',notificatioController.genVapy)

//contr WEB_ADMIN
//router.get('/Alluser',administrationController.selectuser)

//mongodb
router.get('/init',mongoCtrl.subcribirse)
router.post('/createUser',mongoCtrl.createUser)
router.put('/updateUser',mongoCtrl.updateUser)
router.delete('/deleteUser',)

module.exports = router
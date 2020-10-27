const express = require('express')
const router = express.Router();

const notificatioController = require('../controllers/notification.js')
const administrationController = require('../controllers/administration.js')

//const camUserController = require('../controllers/camUserControllers')

//contr NOTIFICATIONS
router.post('/subcribirse',notificatioController.subcribirse);
router.get('/SMGpost',notificatioController.pusSMG)
router.post('/genVapy',notificatioController.usersTrue,notificatioController.genVapy)

//contr WEB_ADMIN
router.get('/Alluser',administrationController.selectuser)

module.exports = router
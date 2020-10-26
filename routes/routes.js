const express = require('express')
const router = express.Router();

const notificatioController = require('../controllers/notification.js')

//const camUserController = require('../controllers/camUserControllers')

//PUSH NOTIFICATIONS
router.post('/subcribirse',notificatioController.subcribirse);
router.get('/SMGpost',notificatioController.pusSMG)
router.post('/genVapy',notificatioController.usersTrue,notificatioController.genVapy)

module.exports = router
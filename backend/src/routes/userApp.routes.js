const express = require('express')
const router = express.Router()
const controller = require('../controllers/userApp.controller')

router.route('/save-image').post(controller.saveDetails)

module.exports = router
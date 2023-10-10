var express = require('express');
var router = express.Router();
const userAppRoutes = require('./userApp.routes')

router.use('/user', userAppRoutes)

module.exports = router;

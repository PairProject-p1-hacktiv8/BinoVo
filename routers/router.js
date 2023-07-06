const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.homePage)
router.get('/login', Controller.loginPage)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.registerPage)
router.post('/register', Controller.registerPost)
router.get('/projectList', Controller.projectList)


module.exports = router
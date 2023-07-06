const express = require('express')
const router = express.Router()
const Controller = require( '../controllers/controller')

router.get('/', Controller.homePage)
router.get('/login',Controller.loginPage)
router.get('/register',Controller.registerPage)
router.get('/projectList', Controller.projectList)


module.exports =router
const Controller = require('../controllers/controller')
const session = require('express-session')
const express = require('express')
const router = express.Router()



router.get('/', Controller.homePage)
router.get('/login', Controller.loginPage)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.registerPage)
router.post('/register', Controller.registerPost)

// middleware untuk mengecek session 
router.use(function(req, res, next){
    if(!req.session.userId){
        res.redirect('/login')
    } else {
        next()
    }
})


router.get('/company/:comId', Controller.projectCompany)
router.get('/investor/projectList', Controller.projectList)
router.get('/investor/:invId', Controller.portofolio)


module.exports = router
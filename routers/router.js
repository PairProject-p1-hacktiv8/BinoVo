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
router.get('/company/:comId/project', Controller.projectCompany)
router.get('/company/:comId/project/add', Controller.addProjectForm)
router.post('/company/:comId/project/add', Controller.addProject)
router.get('/company/:comId/project/edit/:proId', Controller.editProjectForm)
router.get('/company/:comId/project/edit/:proId', Controller.editProject)
router.get('/investor/projectList', Controller.projectList)
router.get('/investor/projectList/:proId', Controller.projectList)
router.get('/investor/:invId/projectList', Controller.portofolio)


module.exports = router
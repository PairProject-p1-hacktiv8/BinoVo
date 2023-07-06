const Controller = require('../controllers/companyController')
const InvestorControler = require('../controllers/investorControler')
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

router.get('/logout', Controller.logOut)
router.get('/company/add', Controller.addFormCompany)
router.post('/company/add', Controller.postCompany)
router.get('/company/:comId', Controller.projectCompany)
router.get('/company/:comId/project', Controller.projectCompany)
router.get('/company/:comId/project/add', Controller.addProjectForm)
router.post('/company/:comId/project/add', Controller.addProject)
router.get('/company/:comId/project/edit/:proId', Controller.editProjectForm)
router.post('/company/:comId/project/edit/:proId', Controller.editProject)
router.get('/investor/add', InvestorControler.renderFormInvestor)
router.post('/investor/add', InvestorControler.addNewInvestor)
router.get('/investor/:id/projectList', InvestorControler.projectList)
router.get('/investor/:id/projectList/:proId', InvestorControler.projectDetail)
router.get('/investor/:invId/profile', InvestorControler.investorProfile)
router.get('/investor/:invId/projectList/:proId/buySaham', InvestorControler.buySahamForm)
router.post('/investor/:invId/projectList/:proId/buySaham', InvestorControler.buySaham)
router.get('/investor/:invId/portofolio/:pId/delete', InvestorControler.deletePortofolio)
// router.get('/investor/:invId/projectList', InvestorControler.portofolio)


module.exports = router
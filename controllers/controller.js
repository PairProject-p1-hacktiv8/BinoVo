const { Company, Investor,Project, ProjectInvestor, User } = require('../models')

module.exports = class Controller {
    static homePage(req,res){
        res.render('home')
    }
    static loginPage(req,res){
        res.render('login')
    }
    static registerPage(req,res){
        res.render('register')
    }
    static projectList(req,res){
        res.render('login')
    }
    static tes(req, res){
        res.send('hello word')
    }
}

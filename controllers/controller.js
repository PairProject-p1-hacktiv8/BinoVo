const { Company, Investor,Project, ProjectInvestor, User } = require('../models')

module.exports = class Controller {
    static homePage(req,res){
        res.render('home')
    }
    static loginPage(req,res){
        res.render('login')
    }
    static loginPost(req, res) {
        const { username, password, email, role } = req.body
        console.log(username, password, email, role );
    }
    static registerPage(req,res){
        res.render('register')
    }

    static registerPost(req, res){
        let { username, password, email, role } =  req.body
        // console.log(username, password, email, role );
        
        
    }
    static projectList(req,res){
        res.render('login')
    }
    static tes(req, res){
        res.send('hello word')
    }
}

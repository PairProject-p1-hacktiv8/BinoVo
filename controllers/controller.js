const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed } = require('../helpers')
module.exports = class Controller {
    static homePage(req, res) {
        res.render('home')
    }
    static loginPage(req, res) {
        res.render('login')
    }
    static loginPost(req, res) {
        const { username, password, email, role } = req.body
        User.findOne({
            where: {
                username: username
            }
        })
            .then(result => {
                if (result === null) {
                    res.send('akun dengan username tersebut tidak di temukan')
                } else {
                    let dbPass = result.password
                    if (compareHassed(password, dbPass)) {
                        req.session.userId = result.id
                        res.status(200).send(result)
                    } else {
                        const errMsg = 'Password tidak cocok'
                        res.redirect('/login?error='+ errMsg)
                        // res.send('password berbeda')
                    }
                }
            })

    }
    static registerPage(req, res) {
        res.render('register')
    }

    static registerPost(req, res){
        let { username, password, email, role } = req.body
        console.log(username, password, email, role, 'log dari controler');
        User.create({ username, password, email, role })
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })

    }
    static projectList(req, res) {
        res.render('login')
    }

    //Page setelah login AS company
    static projectCompany(req , res){ 
        const {comId} = req.params
        Company.findOne({
            where:{
                id:comId
            },
            include:{
                model:Project
            }
        })
        .then(company => {
            res.render('projectCompany',{company})
        })
        .catch(err => {
            res.send(err)
        })
    }   

    //form add project Company
    static addProjectForm(req,res){
        res.render('addProject')
    }
    //Post add project Company
    static addProject(req,res){
        const CompanyId = req.params.comId
        const {nameProject , minimumLoad ,detail , imageURL} = req.body
        Project.create({nameProject , minimumLoad ,detail,CompanyId ,imageURL})
        .then(()=>{
            res.redirect(`/company/${CompanyId}/project`)
        })
        .then(()=>{
            res.send(err)
        })
    }

    //form edit project Company
    static editProjectForm(req , res){ 
        const {comId , proId} = req.params
        Project.findOne({where:{id:proId}})
        .then(project => {
            res.render('editProject',{project})
        })
        .catch(err => {
            res.send(err)
        })
    }   
    //post edit project
    static editProject(req,res){
        const {comId,proId} = req.params
        const {nameProject , minimumLoad ,detail , imageURL} = req.body
        Project.update({nameProject , minimumLoad ,detail,imageURL},{where:{id:proId}})
        .then(()=>{
            res.redirect(`/company/${comId}/project`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    //page setelah login as investor
    static projectList(req,res){
        Project.findAll()
        .then(project =>{
            res.render('projectList',{project})
        })
        .catch(err => {
            res.send(err)
        })
    }
    //setelah klik project masuk keform ini
    static projectDetail(req,res){
        const {proId} = req.params
        Project.findOne({where:{id:proId}})
        .then(project =>{
            res.render('detailProject',{project})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static tes(req, res) {
        res.send('hello word')
    }
}

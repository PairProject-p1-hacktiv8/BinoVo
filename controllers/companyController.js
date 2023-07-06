const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed } = require('../helpers')
const { use } = require('../routers/router')
module.exports = class Controller {

    static homePage(req, res) {
        res.render('home')
    }


    static loginPage(req, res) {
        let { error, errorPassword, errorUsername, invalid } = req.query
        res.render('login', { error, errorPassword, errorUsername, invalid })
    }


    static loginPost(req, res) {
        const { username, password } = req.body
        if (username === undefined || password === undefined) {
            let msg = 'please fill the input below'
            res.redirect('/login?invalid=' + msg)
        } else {
            User.findOne({
                where: {
                    username: username
                },
            })
                .then(result => {
                    if (result === null) {
                        let errMsg = 'akun dengan username tersebut tidak di temukan'
                        return res.redirect('/login?errorUsername=' + errMsg)
                    } else {
                        let dbPass = result.password
                        if (compareHassed(password, dbPass)) {
                            req.session.userId = result.id
                            // console.log(req.session, 'result dari session');
                            res.redirect(`/company/${result.id}`)
                        } else {
                            const errMsg = 'Password tidak cocok'
                            return res.redirect('/login?errorPassword=' + errMsg)
                        }
                    }
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError') {
                        let errMsg = err.errors.map(el => el.message)
                        return res.redirect(`/login?error=${errMsg}`)
                    } else {
                        console.log(err);
                        return res.render(err)
                    }
                })
        }

    }


    static registerPage(req, res) {
        let { error, usernameError } = req.query
        res.render('register', { error, usernameError })
    }

    static registerPost(req, res) {
        let { username, password, email, role } = req.body
        User.create({ username, password, email, role })
            .then(result => {
                req.session.userId = result.id
                if(role === 'investor'){
                    res.redirect('/investor/add')
                    // res.send(result)
                } else {
                    res.redirect('/company/add')
                }
                console.log(req.session.userId, 'user id');
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let errMsg = err.errors.map(el => el.message)
                    res.redirect(`/register?error=${errMsg}`)
                } else {
                    console.log(err)
                    res.send(err)
                }
            })

    }


    static postCompany(req, res) {
        let UserId = req.session.userId
        let { nameCompany, address } = req.body
        Company.create({ nameCompany, address, UserId })
            .then(result => {
                res.redirect(`/company/${result.id}`)
            })
    }


    static addFormCompany(req, res) {
        res.render('addCompany')
    }


    static projectList(req, res) {
        res.render('login')
    }


    //Page setelah login AS company
    static projectCompany(req, res) {
        // const { comId } = req.params
        const { userId } = req.session
        // Company.findOne({
        //     where: {
        //         id: comId
        //     },
        //     include: {
        //         model: Project
        //     }
        // })
        User.findOne({
            where: {
                id: userId
            },
            include: {
                model: Company,
                include: {
                    model: Project
                }
            }
        })
            .then(usered => {
                console.log(usered.Company, 'ini company details');
                const { Company } = usered
                res.render('projectCompany', { Company })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //form add project Company
    static addProjectForm(req, res) {
        let { comId } = req.params
        console.log(comId, 'ini com id dari add projet');
        res.render('addProject', { comId })
    }


    //Post add project Company
    static addProject(req, res) {
        const CompanyId = req.params.comId
        const { nameProject, minimumLoad, detail, imageURL } = req.body
        Project.create({ nameProject, minimumLoad, detail, CompanyId, imageURL })
            .then(() => {
                res.redirect(`/company/${CompanyId}/project`)
            })
            .then((err) => {
                res.send(err)
            })
    }


    //form edit project Company
    static editProjectForm(req, res) {
        const { comId, proId } = req.params
        Project.findOne({ where: { id: proId } })
            .then(project => {
                res.render('editProject', { project })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //post edit project
    static editProject(req, res) {
        const { comId, proId } = req.params
        const { nameProject, minimumLoad, detail, imageURL } = req.body
        Project.update({ nameProject, minimumLoad, detail, imageURL }, { where: { id: proId } })
            .then(() => {
                res.redirect(`/company/${comId}/project`)
            })
            .catch(err => {
                res.send(err)
            })
    }


   
    static tes(req, res) {
        res.send('hello word')
    }

    //setelah klik pendanaan
}

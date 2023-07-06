const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed } = require('../helpers')
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
                            console.log(req.session, 'result dari session');
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
        let { error } = req.query
        res.render('register', { error })
    }

    static registerPost(req, res) {
        let { username, password, email, role } = req.body
        User.create({ username, password, email, role })
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let errMsg = err.errors.map(el => el.message)
                    return res.redirect(`/register?error=${errMsg}`)
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
        const { comId } = req.params
        Company.findOne({
            where: {
                id: comId
            },
            include: {
                model: Project
            }
        })
            .then(company => {
                res.render('projectCompany', { company })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //form add project Company
    static addProjectForm(req, res) {
        res.render('addProject')
    }


    //Post add project Company
    static addProject(req, res) {
        const CompanyId = req.params.comId
        const { nameProject, minimumLoad, detail, imageURL } = req.body
        Project.create({ nameProject, minimumLoad, detail, CompanyId, imageURL })
            .then(() => {
                res.redirect(`/company/${CompanyId}/project`)
            })
            .then(() => {
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


    //page setelah login as investor
    static projectList(req, res) {
        Project.findAll()
            .then(project => {
                res.render('projectList', { project })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //setelah klik project masuk keform ini
    static projectDetail(req, res) {
        const { proId } = req.params
        Project.findOne({ where: { id: proId } })
            .then(project => {
                res.render('detailProject', { project })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static tes(req, res) {
        res.send('hello word')
    }
}

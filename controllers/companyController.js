const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed, formatCurent } = require('../helpers')

module.exports = class Controller {

    // HOME PAGE 

    static homePage(req, res) {
        let layaa = 'hello world'
        res.render('home', { layaa})
    }


    //  ========================>>>> LOGIN, REGIS AND VALIDATION

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
                include: Company
            })
                .then(result => {
                    if (result === null) {

                        let errMsg = 'akun dengan username tersebut tidak di temukan'
                        return res.redirect('/login?errorUsername=' + errMsg)

                    } else {
                        let dbPass = result.password
                        if (compareHassed(password, dbPass)) {
                            req.session.userId = result.id

                            // console.log(result, '<<<<<<<<<<<<<<<<<<<<<<<');
                            
                            if(result.role === 'investor'){
                                return Investor.findOne({
                                    where: {
                                        UserId: result.id
                                    }
                                })

                            } else {

                                console.log(result.Company.id, ' <<<<<<<<<<<<< RESULT COMPANY')
                                let id = result.Company.id
                                res.redirect(`/company/${id}`)

                            }

                            
                        } else {
                            const errMsg = 'Password tidak cocok'
                            return res.redirect('/login?errorPassword=' + errMsg)
                        }
                    }
                })
                .then(resInvestor => {
                    if(resInvestor) {
                        // console.log(resInvestor.id, ' ini investor login');
                        req.session.InvestorId = resInvestor.id
                        req.session.InvestorName = resInvestor.nameInvestor
                        res.redirect(`/investor/${resInvestor.id}/projectList?login=succes`)
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
                    req.session.invId = result.id
                    req.session.save()
                } else {
                    res.redirect('/company/add')
                }
                // console.log(req.session.userId, 'user id');
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                    let errMsg = err.errors.map(el => el.message)
                    res.redirect(`/register?error=${errMsg}`)
                    req.session.save()
                } else {
                    console.log(err)
                    res.send(err)
                }
            })

    }


    static logOut(req, res) {
        req.session.destroy(function(err) {
            if(err) console.log('gagal <<<<<<<<<<<<<')
        })
        res.redirect('/')
    }

    static postCompany(req, res) {
        let UserId = req.session.userId
        let { nameCompany, address } = req.body
        Company.create({ nameCompany, address, UserId })
            .then(result => {
                res.redirect(`/company/${result.id}`)
                req.session.save()
            })
    }

    //    >>>>>>>>>>>>>>>>>>>>>  DETAIL ABOUT COMPANY

    static addFormCompany(req, res) {
        
        res.render('addCompany')
    }


    // static projectList(req, res) {
    //     res.render('login')
    // }


    //Page setelah login AS company
    static projectCompany(req, res) {
        const { userId } = req.session

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
                req.session.save()
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
                req.session.save()
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

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

    static registerPost(req, res) {
        let { username, password, email, role } = req.body
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
    static tes(req, res) {
        res.send('hello word')
    }
}

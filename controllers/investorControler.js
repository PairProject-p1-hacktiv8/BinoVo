const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed } = require('../helpers')

module.exports = class InvestorControler {
    static renderFormInvestor(req, res){
        let { error } = req.query
        res.render('addInvestor', { error })
    }


    static addNewInvestor(req, res) {
        let UserId = req.session.userId
        let { fullname } = req.body
        Investor.create({nameInvestor: fullname, UserId})
        .then(result => {
            let investorId = result.id
            res.redirect(`/investor/${investorId}/projectList`)
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let errMsg = err.errors.map(el => el.message)
                res.redirect(`/investor/add?error=${errMsg}`)
            } else {
                console.log(err)
                res.send(err)
            }
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
}
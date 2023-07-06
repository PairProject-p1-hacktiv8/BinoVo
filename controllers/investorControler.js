const { Company, Investor, Project, ProjectInvestor, User } = require('../models')
const { compareHassed } = require('../helpers')

module.exports = class InvestorControler {
    static renderFormInvestor(req, res){
        let { error } = req.query
        res.render('addInvestor', { error })
    }


    static addNewInvestor(req, res) {
        let UserId = req.session.userId
        let { nameInvestor } = req.body
        console.log(nameInvestor, 'nama nya');

        Investor.create({nameInvestor, UserId})
        
        .then(result => {

            // console.log(result, ' name investor 16');

            let investorId = result.id
            req.session.InvestorId = investorId
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
        let { investorId } = req.session
        const { proId } = req.params
        Project.findOne({ where: { id: proId } })
            .then(project => {
                res.render('detailProject', { project , investorId })
            })
            .catch(err => {
                res.send(err)
            })
    }
}
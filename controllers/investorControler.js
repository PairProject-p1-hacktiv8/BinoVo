const { Company, Investor, addNewInvestor, ProjectInvestor, User, Project } = require('../models')
const { Op } = require("sequelize");

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
        let { search, sort } = req.query
        let option = {
            where: {}
        }

        if(search){
            option.where.nameProject = {
                [Op.iLike]: `%${search}%`,
            }
        }

        if(sort){
            option.order = [
                ['minimumLoad', sort ]
            ]
        }
        let UserId = req.session.userId 
        Project.findAll(option)
            .then(project => {

                res.render('projectList', { project, UserId })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //setelah klik project masuk keform ini
    static projectDetail(req, res) {
        let  investorId  = req.session.InvestorId
        // console.log(req.session, 'id invess');
        const { proId } = req.params
        Project.findOne({ where: { id: proId } })
            .then(project => {
                res.render('detailProject', { project , investorId })
            })
            .catch(err => {
                res.send(err)
            })
    }


    static investorProfile(req, res) {
        
        Investor.findAll({
            include:{
                model: ProjectInvestor,
                include: Project
            }
        })
        .then(result => {
            res.send(result)
        })
    }



    static buySahamForm(req, res) {
        const {proId ,invId} = req.params
        let { error } = req.query
        let data = {error}
        Project.findOne({
           where:{
            id:proId
           }
        })
        .then(project => {
            data.project = project
            return Investor.findOne({where:{id:invId}})
        })
        .then(investor => {
            data.investor = investor
            res.render('buySaham',data)
        })
        .catch(err => {
            res.send(err)
            console.log(err);

        })
    }




    static buySaham(req, res) {
        const {proId ,invId} = req.params
        const {load} = req.body
        let data = {}
        Investor.findOne({
           where:{
            id:invId
           }
        })
        .then(investor => {
            if(investor.balance > load){
                data.balance = investor.balance
                return Project.findOne({where:{id:proId}})
            } else {
                let msg = 'Saldo anda tidak mencukupi'
                throw new Error(msg)
            }
        })
        .then(project => {
            if(load > project.minimumLoad){
                return ProjectInvestor.create({InvestorId:invId , ProjectId:proId , load })
            } else {
                let msg = 'Minimum load adalah:'+ ' ' + project.minimumLoad
                throw new Error(msg)

            }
        })
        .then(()=> {
            let newBalance = data.balance - load
            Investor.update({balance: newBalance}, {
                where: {
                    id: invId
                }
            })
            res.redirect(`/investor/${invId}/projectList`)
            return;
        })
        .catch(err => {
            console.log(err);
            let errorMsg = err.message
            res.redirect(`/investor/${invId}/projectList/${proId}/buySaham?error=${errorMsg}`)
        })
    }
}
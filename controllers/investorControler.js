const { Company, Investor, addNewInvestor, ProjectInvestor, User, Project } = require('../models')
const { Op } = require("sequelize");
const { compareHassed, formatCurent } = require('../helpers')

module.exports = class InvestorControler {
    static renderFormInvestor(req, res){
        let invId = req.session.InvestorId
        let nameInv = req.session.nameInvestor
        let { error } = req.query
        res.render('addInvestor', { error, invId, nameInv })
    }

    static addNewInvestor(req, res) {
        let UserId = req.session.userId
        let { nameInvestor } = req.body
        // console.log(nameInvestor, 'nama nya');

        Investor.create({nameInvestor, UserId})
        
        .then(result => {


            let investorId = result.id
            req.session.InvestorId = investorId
            req.session.InvestorName = result.nameInvestor
            res.redirect(`/investor/${investorId}/projectList`)
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let errMsg = err.errors.map(el => el.message)
                res.redirect(`/investor/add?error=${errMsg}`)
                req.session.save()
            } else {
                console.log(err)
                res.send(err)
            }
        })

    }


     //page setelah login as investor
     static projectList(req, res) {
        let invId = req.session.InvestorId
        let nameInv = req.session.nameInvestor
        let { search, sort, login } = req.query
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

                res.render('projectList', { project, UserId, invId, nameInv, formatCurent,login })
            })
            .catch(err => {
                res.send(err)
            })
    }


    //setelah klik project masuk keform ini
    static projectDetail(req, res) {
        let  investorId  = req.session.InvestorId
        let nameInv = req.session.nameInvestor
        // console.log(req.session, 'id invess');
        const { proId } = req.params
        Project.findOne({ where: { id: proId } })
            .then(project => {
                res.render('detailProject', { project , investorId, nameInv, formatCurent })
            })
            .catch(err => {
                res.send(err)
            })
    }


    static investorProfile(req, res) {
        
        Investor.findOne({
            include:{
                model: ProjectInvestor,
                include: Project
            }
        })
        .then(investor => {
            // console.log(investor);
            // console.log(investor.ProjectInvestors[0].Project);
            res.render('profileInvestor' , {investor, formatCurent})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }



    static buySahamForm(req, res) {
        const {proId ,invId} = req.params
        let { error } = req.query
        let nameInv = req.session.nameInvestor
        let data = {error, invId, nameInv, formatCurent }
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
            req.session.save()
            return;
        })
        .catch(err => {
            console.log(err);
            let errorMsg = err.message
            res.redirect(`/investor/${invId}/projectList/${proId}/buySaham?error=${errorMsg}`)
            req.session.save()
        })
    }
    
    static deletePortofolio(req, res){
        const {pId ,invId} = req.params
        ProjectInvestor.findOne({
            where:{ id:pId},
            include:Investor
        })
        .then(portofolio => {
            console.log(portofolio);
            let newBalance = portofolio.Investor.balance + portofolio.load
            console.log(newBalance);
            Investor.update({balance: newBalance}, {
                where: {
                    id: invId
                }
            })
            return ProjectInvestor.destroy({where:{id:pId}})
        })
        .then(()=> res.redirect(`/investor/${invId}/profile`))
        .catch(err => {
            res.send(err)
            console.log(err);
        })
    }

}
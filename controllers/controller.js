const { Company, Investor,Project, ProjectInvestor, User } = require('../models')

module.exports = class Controller {
    static tes(req, res){
        res.send('hello word')
    }
}

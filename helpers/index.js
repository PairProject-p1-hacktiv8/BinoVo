const bcryp = require('bcryptjs')

function hashingPassword(password){
        const salt = bcryp.genSaltSync(10)
        return  bcryp.hashSync(password, salt)
}

function compareHassed(curenPass, dbPass){
    return bcryp.compareSync(curenPass, dbPass)
}

module.exports = { hashingPassword, compareHassed }
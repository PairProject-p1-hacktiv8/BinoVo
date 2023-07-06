const bcryp = require('bcryptjs')

function hashingPassword(password){
        const salt = bcryp.genSaltSync(10)
        return  bcryp.hashSync(password, salt)
}

function compareHassed(curenPass, dbPass){
    return bcryp.compareSync(curenPass, dbPass)
}


function formatCurent(money){
    return money.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
}
module.exports = { hashingPassword, compareHassed, formatCurent }
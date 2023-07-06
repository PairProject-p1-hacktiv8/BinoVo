const bcryp = require('bcryptjs')

function hashingPassword(password){
    return new Promise((resolve, reject) => {
        const salt = bcryp.genSalt(10)
        bcryp.hash(password, salt)
        .then(hass => {
            resolve(hass)
        })
        .catch(err => {
            reject(err)
        })
    })
}


module.exports = { hashingPassword }
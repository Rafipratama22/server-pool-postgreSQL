const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validateBool = (input, hash) => {
    return bcrypt.compareSync(input, hash)
}

const hashPassword = (input) => {
    return bcrypt.hashSync(input, 8)
}

const createToken = (input) => {
    const access_token = jwt.sign(input, 'SECRET')
    return access_token
}

module.exports = {validateBool, hashPassword, createToken}
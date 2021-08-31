const Admin = require('../models/admin')
const {hashPassword} = require('../helper')

class ControllerAdmin{
    static async PostAdmin(req, res, next){
        try {
            let {email, password} = req.body
            password = hashPassword(password)
            await Admin.CreateAdmin({email, password, role: 'Admin'})
        } catch (err) {
            const message = err.message
            const code = err.code || 500
            next({
                message, code
            })
        }
    }
    static async LoginAdmin(req, res, next){
        try {
            let {email, password} = req.body
            await Admin.LoginAdmin({email, password})
        } catch (err) {
            const message = err.message
            const code = err.code || 500
            next({
                message, code
            })
        }
    }
    static async GetAdmin(req, res, next){
        try {
            const data = await Admin.GetAdmin()
            res.status(200).json(data)
        } catch (err) {
            const message = err.message
            const code = err.code || 500
            next({
                message, code
            })
        }
    }
    static async UpdateAdmin(req, res, next){
        try {
            const {password} = req.body
            const bool = await Admin.BoolEdit({password})
            if(bool){
                const data = await Admin.EditPasswordAdmin({password})
                res.status(200).json(data)
            }
        } catch (err) {
            const message = err.message
            const code = err.code || 500
            next({
                message, code
            })
        }
    }
}

module.exports = ControllerAdmin
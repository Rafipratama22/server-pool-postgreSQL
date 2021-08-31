const pool = require('../config/connection')
const {validateBool} = require('../helper')

class Admin{
    static async CreateAdmin(input){
        try {
            const {email, password, role} = input
        let error = []
        if(!email) error.push('email must be fined')
        if(!password) error.push('password must be fined')
        if(!role) error.push('role must be fined')
        if(error.length > 0){
            throw {message: error}
        } else{
            const data = await pool.query(`INSERT INTO "Admins"("email", "password", "role") VALUES (
                "${email}", "${password}", "${role}"
            )`)
            return data
        }
        } catch (err) {
            throw err      
        }    
    }
    static async GetAdmin(){
        try {
            const data = await pool.query(`SELECT * FROM 'Admins'`)
            return data
        } catch (err) {
            throw {message: err.message}
        }
    }
    static async EditPasswordAdmin({password, id}){
        try {
            let error = []
            if(!password) error.push('password must be fined')
            if(error.length > 0) throw {message: error}
            const data = await pool.query(`
                UPDATE 'Admin' SET password = '${password}' WHERE id = ${+id}
            `)
            return {message: 'success updated password'}
        } catch (err) {
            throw err
        }
    }
    static async BoolEdit({password, id}){
        try {
            if(!password) throw {message: 'password must be fined'}
            const pass = await pool.query(`SELECT password FROM 'Admins' WHERE id=${+id}`)
            const bool = validateBool(password, pass)
            return bool
        } catch (error) {
            throw error
        }
    }
    static async LoginAdmin({password, email}){
        try {
            let error = []
            if(!password) error.push('password must be fined')
            if(!email) error.push('email must be fined')
            if(error.length > 0) throw {message: error, code: 400}
            const data = await pool.query(`SELECT * FROM 'Admins' WHERE email = ${email}`)
            if(data){
                const passBool = validateBool(password, data.password)
                if(passBool) return passBool
                else throw {message: 'Error password/email is wrong', code: 400}
            }
        } catch (err) {
            throw err
        }
    }
}
module.exports = Admin
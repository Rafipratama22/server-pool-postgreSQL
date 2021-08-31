const {Pool} = require('pg')

const setup = new Pool({
    user: 'postgres',
    host: "127.0.0.1",
    password: "rafipratama",
    port: 5432
})

// setup.query(
//     `CREATE DATABASE "ally-doc"`,
//     (err) => {
//         if(err) console.error(err)
//         else console.log('Database successfully created')
//     }
// )

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'rafipratama',
    database: 'ally-doc',
    port: 5432
})

module.exports = pool
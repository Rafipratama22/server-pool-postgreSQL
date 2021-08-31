const pool = require('../config/connection')
const createTableAdmin = `DROP TABLE IF EXISTS "Admins";
    CREATE TABLE IF NOT EXISTS "Admins"(
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(65535) NOT NULL,
        role VARCHAR(10) NOT NULL,
    )
`

pool.query(createTableAdmin)
.then(data => console.log(data))
.catch(err => console.error(err))

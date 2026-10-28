//class from a libary to connect databases to code
const { Pool } = require('pg')
const db = new Pool({ //new instance of the class
    connectionString: process.env.DB_URL
})

module.exports = db
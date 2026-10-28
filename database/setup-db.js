const fs = require('fs') //file sytstem
require('dotenv').config()

const sql = fs.readFileSync(__dirname + '/setup.sql').toString()

const db = require('./db')

db.query(sql)
    .then(data => (console.log('Set-up complete.'))) //same as async await
    .catch(error => console.log(error))


const mysql = require('mysql2')
const config = require('../config')

const conexao = mysql.createConnection({
    host: config.host,
    port:config.port,
    user:config.user,
    password:config.password,
    database: config.database
})

module.exports = conexao
const customExpress = require('./config/customExpress')
const conection = require('./database/connection')
const tables = require('./database/tables')


conection.connect((err) =>{
    err ? console.error(err) :
     console.log('Conected to the database')
     tables.init(conection)
})

const app = customExpress()
app.listen(8181, () => console.log('Listen on port 8181'))


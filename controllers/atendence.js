const consult = require('../models/consults')


module.exports = app => {
    app.get('/consulta', (req, res) => {
        consult.retrieve(res)

    })  

    app.get('/consultabyid/:id', (req, res) => {
        consult.retrieve_one(req, res)
    })

    app.post('/consulta', (req, res) => {

        consult.add(req.body, res)
    })

    app.patch('/alterarconsulta/:id', (req, res) => {
        consult.change(req, req.body, res)
    })

    app.delete('/deleteconsulta/:id', (req, res) => {
        consult.delete(req, res)
    })
}


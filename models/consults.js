const conexao = require('../database/connection')
const validators = require('../validators/checkers')
const moment = require('moment')

class PetCare {
    add(consultRequest, res) {
        let isInvalid = validators.validateConsultPost(consultRequest)
        let responseObj
        if (isInvalid) {
            responseObj = {
                status: 400,
                message: 'Unprocessable Entity, Invalid request.'
            }
            res.status(400).json(responseObj)
        } else {
            consultRequest.consult_date = moment(consultRequest.consult_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
            const sqlAdd = `INSERT INTO Petcare SET ?`
            conexao.query(sqlAdd, consultRequest, (err, results) => {
                if (err) {
                    console.log(err)
                    return { error: 'Could not create consultation.' }
                } else {
                    console.log(results)
                }
            })
            responseObj = {
                created: consultRequest,
                message: 'Consult successfully created'
            }
            res.json(responseObj)
            res.status(201)
        }
        res.send()
    }

    retrieve(res){
        const sqlGetAll = `select * from petcare`
        conexao.query(sqlGetAll, (err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(results)
            }
        })
    }
    
    retrieve_one(req, res){
        const sqlGetAll = `select * from petcare where id = ?`
        
        //Essa query abaixo é a query que fará você sofrer SQL INJECTION - EVITE-A
        // se eu fizer uma requisição igual a http://localhost:8181/consultabyid/1111 or id >= 1
        // Você acaba de tomar uma injeção de sql.
        const sqlGetAll2 = `select * from petcare where id = ${req.params.id}`

        conexao.query(sqlGetAll, req.params.id ,(err, results) => {
            if (err) {
                res.status(400).json(err)
            } else {
                if (results.length !== 0){
                    res.status(200).json(results)
                }else{
                    res.status(404).json({message:"Not found"})
                }
                
            }
        })
    }

    change(req, values, res) {
        if (values.consult_date){
            values.consult_date = moment(values.consult_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sqlChange = `UPDATE petcare set ? where id = ?`
        conexao.query(sqlChange, [values, req.params.id], (err, results) =>{
            if (err) {
                res.status(400).json({msg:err.sqlMessage})
            }
            else {
                this.retrieve_one(req, res)
            }
        })
    }

    delete(req, res){
        const sqlDelete = `DELETE FROM petcare WHERE id = ?`

        conexao.query(sqlDelete, req.params.id, (err, results) => {
            if (err) {
                res.status(400).json({msg:err.sqlMessage})
            }
            else{
                res.status(200).json({deleted:req.params.id})
            }
        })


    }
}

module.exports = new PetCare
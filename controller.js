const database = require('./database.js')
const firebird = require('node-firebird')

function getProducts(req, res) {
    firebird.attach(database, (err, db) => {
        filter = []
        ssql = 'SELECT * FROM COMPUTERS WHERE ID > 0'

        if (err) {
            res.send(err)
        }

        if (req.query.id) {
            ssql += ' AND ID LIKE ?'
            filter.push('%' + req.query.id + '%')
        }

        if (req.query.name) {
            ssql += ' AND NAME LIKE ?'
            filter.push('%' + req.query.name + '%')
        }
        
        db.query(ssql, filter, (err, result) => {
            db.detach()

            if (err) {
                res.json(err.message)
            } else {
                res.json(result)
            }
        })
    })
}

function postProduct(req, res) {
    firebird.attach(database, (err, db) => {
        if (err) {
            res.send(err)
        }
        
        db.query(`INSERT INTO COMPUTERS(NAME) VALUES(?) RETURNING ID`, req.query.name, (err, result) => { //fazer um id auto increment //usar req.query ou .param, porque .body gera um valor undefined no banco
            db.detach()

            if (err) {
                res.json(err.message)
            } else {
                res.json({id: result.ID})
            }
        })
    })
}

function patchProduct(req, res) {
}

function deleteProduct(req, res) {
    firebird.attach(database, (err, db) => {
        if (err) {
            res.send(err)
        }

        db.query('DELETE FROM COMPUTERS WHERE ID = ?', req.query.id, (err, result) => {
            db.detach()

            if (err) {
                res.json(err)
            } else {
                res.json('Deletado', result)
            }
        })
    })
}

module.exports = { getProducts, postProduct, patchProduct, deleteProduct }
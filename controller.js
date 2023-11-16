const { requestDB } = require('./database.js')

function getProducts(req, res) {
    var ssql = 'SELECT * FROM COMPUTERS WHERE ID > 0'
    var filter = []

    if (req.query.id) {
        ssql += ' AND ID LIKE ?'
        filter.push('%' + req.query.id + '%')
    }

    if (req.query.name) {
        ssql += ' AND NAME LIKE ?'
        filter.push('%' + req.query.name + '%')
    }

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

function postProduct(req, res) {
    const ssql = 'INSERT INTO COMPUTERS(NAME) VALUES(?) RETURNING ID'
    const filter = req.query.name

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send('Adicionado')
    })
}

function patchProduct(req, res) {
    const ssql = `UPDATE COMPUTERS SET NAME = ? WHERE ID = ${req.query.id}`
    const filter = req.query.name

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send('Editado')
    })
}

function deleteProduct(req, res) {
    const ssql = 'DELETE FROM COMPUTERS WHERE ID = ?'
    const filter = req.query.id

    requestDB(ssql, filter, (err, result) => {
        if (err) res.send('Erro ao deletar')
        res.send('Deletado')
    })
}

module.exports = { getProducts, postProduct, patchProduct, deleteProduct }
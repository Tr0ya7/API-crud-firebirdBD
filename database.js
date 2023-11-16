const firebird = require('node-firebird')

const database = {
    host: '127.0.0.1',
    port: 3070,
    database: 'C:\\DB_PRODUCTS.FDB',
    user: 'SYSDBA',
    password: 'masterkey'
}

function requestDB(ssql, filter, callback) {
    firebird.attach(database, (err, db) => {
        if (err) callback(err, null)

        db.query(ssql, filter, (err, result) => {
            db.detach()

            if (err) callback(err, null)
            else callback(null, result)
        })
    })
}

module.exports = { database, requestDB }
let connection = require("../config/db")


class Meeting {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT *  FROM metings", (err, result) => {
                if (err) {
                    throw err
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}

module.exports = Meeting
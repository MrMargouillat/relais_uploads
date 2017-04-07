let connection = require("../../config/db")
let renameProperty = require("../../helpers/renameProperty")



class Meeting {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT *  FROM meetings", (err, result) => {
                if (err) {
                    throw err
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    selectById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT *  FROM meetings WHERE id = ?", [id], (err, result) => {
                if (err) {
                    throw err
                    reject(err)
                }
                resolve(result[0])
            })
        })
    }
    getByLanguage(language) {
        return new Promise((resolve, reject) => {
            let q
            switch (language) {
                case "fr":
                    q = "SELECT id, year, place, theme_fr FROM meetings"
                    break;

                case "en":
                    q = "SELECT id, year, place, theme_en FROM meetings"
                    break;

                case "pl":
                    q = "SELECT id, year, place, theme_pl FROM meetings"
                    break;

                case "de":
                    q = "SELECT id, year, place, theme_de FROM meetings"
                    break;

                default:
                    reject()
                    return;
                    break;
            }

            connection.query(q, cb)


            function cb(err, result) {
                if (err) {
                    throw err
                    reject(err)
                }
                let arr = []
                for (var i = 0; i < result.length; i++) {

                    var obj = result[i];
                    obj = renameProperty(obj, "theme_" + language, "theme")
                }
                resolve(result)
            }
        })
    }


}
module.exports = Meeting
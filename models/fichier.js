let connection = require("../config/db")
let fs = require("fs")



class Fichier {
    constructor(file = undefined) {
        console.log(file);
        this.file = file;
    }

    inputFile(file) {
        this.file = this.file || file;
    }


    saveWithDb(user_name, user_mail, title) {
        let name = this.file.filename
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO uploads SET ?', {
                    "user_name": user_name,
                    "user_mail": user_mail,
                    "file_name": name,
                    "title": title,
                    "upload_date": new Date()
                },
                (err, result) => {
                    if (err) throw err
                    resolve(result)
                });
        })
    }
}

module.exports = Fichier
let connection = require("../config/db")
let fs = require("fs")
let Meetings = require("./meetings")
let meetings = new Meetings


class Fichier {
    constructor(file = undefined) {
        console.log(file);
        this.file = file;
    }

    inputFile(file) {
        this.file = this.file || file;
    }

    moveTmp(year, place) {
        // TODO : move from uploads to year/place
        return new Promise((resolve, reject) => {
            let newPath = global.__base + "uploads\\" + year + "\\" + place + "\\" + this.file.filename
            console.log(newPath);
            fs.rename(this.file.path, newPath, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    }


    saveWithDb(user_name, user_mail, title, describe, meeting) {
        return new Promise((resolve, reject) => {
            let name = this.file.filename
            meetings.selectById(meeting).then((res) => {
                res = res[0]
                this.moveTmp(res.year, res.place).then(() => {

                })
                connection.query('INSERT INTO uploads SET ?', {
                        "user_name": user_name,
                        "user_mail": user_mail,
                        "file_name": name,
                        "title": title,
                        "description": describe,
                        "meeting": meeting,
                        "upload_date": new Date()
                    },
                    (err, result) => {
                        if (err) throw err
                        resolve(result)
                    });
            })


        })
    }
}

module.exports = Fichier
let connection = require("../config/db")
let fs = require("fs")
let meetings = require("./meetings")



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
        let name = this.file.filename
        this.moveTmp(2017, "Paris")
        return
        // return new Promise((resolve, reject) => {
        //     connection.query('INSERT INTO uploads SET ?', {
        //             "user_name": user_name,
        //             "user_mail": user_mail,
        //             "file_name": name,
        //             "title": title,
        //             "description": describe,
        //             "meeting": meeting,
        //             "upload_date": new Date()
        //         },
        //         (err, result) => {
        //             if (err) throw err
        //             resolve(result)
        //         });
        // })
    }
}

module.exports = Fichier
let express = require("express")
const Fichier = require("../models/fichier")
let language = require("../middlewares/language")

let routes = (upload) => {
    let fileuploadRoute = express.Router()
    fileuploadRoute.route('/upload')
        .post(language, upload.array('audio'), (req, res) => {
            // check if file send
            if (req.files !== "" && req.body.name !== "" && req.body.mail !== "" && req.body.title !== "" && req.body.meeting !== "") {
                if (req.files.length >= 1) {
                    let files = []
                    req.files.forEach((file) => {
                        files.push(new Fichier(file).saveWithDb(req.body.name, req.body.mail, req.body.title, req.body.description, req.body.meeting))
                    }, this)
                    Promise.all(files).then(result => {
                            // TODO : success redirect
                            res.send({})
                        })
                        .catch(err => {
                            throw err
                                // TODO : err redirect
                        })
                } else {
                    res.status(400).send({ text: "no such file" })
                }

            } else {
                console.log("field");
                res.status(400).send({})
            }

        })

    return fileuploadRoute
}

module.exports = routes
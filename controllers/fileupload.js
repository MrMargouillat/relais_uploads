let express = require("express")
const Fichier = require("../models/fichier")

let routes = (upload) => {
    let fileuploadRoute = express.Router()
    fileuploadRoute.route('/upload')
        .post(upload.array('audio'), (req, res) => {
            // check if file send
            if (req.files !== "" && req.body.name !== "" && req.body.mail !== "" && req.body.title !== "" && req.body.meeting !== "") {
                if (req.files.length >= 1) {
                    let files = []
                    req.files.forEach((file) => {
                        files.push(new Fichier(file).saveWithDb(req.body.name, req.body.mail, req.body.title, req.body.description, req.body.meeting))
                    }, this)
                    Promise.all(files).then(result => {
                            // TODO : success redirect
                            res.send(true)
                        })
                        .catch(err => {
                            throw err
                                // TODO : err redirect
                        })
                } else {
                    res.status(400).send({
                        en: "Please select at least one file.",
                        pl: "Please select at least one file.",
                        de: "Please select at least one file.",
                        fr: "Veuillez tout remplir.",
                    })
                }

            } else {
                res.status(400).send({
                    en: "Please fill every thing.",
                    de: "Please fill every thing.",
                    pl: "Please fill every thing.",
                    fr: "Veuillez tout remplir.",
                })
            }

        })

    return fileuploadRoute
}

module.exports = routes
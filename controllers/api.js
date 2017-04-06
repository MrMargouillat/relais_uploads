let express = require("express")
let Meeting = require("../models/meetings")
const Fichier = require("../models/fichier")

let routes = (upload) => {
    let api = express.Router()
    api.route('/file')
        .post(upload.array('audio'), (req, res) => {
            // check if file send
            if (req.files !== "" && req.body.name !== "" && req.body.mail !== "" && req.body.title !== "" && req.body.meeting !== "") {
                if (req.files.length >= 1) {
                    let files = []
                    req.files.forEach((file) => {
                        files.push(new Fichier(file).saveWithDb(req.body.name, req.body.mail, req.body.title, req.body.description, req.body.meeting))
                    }, this)
                    Promise.all(files).then(result => {
                            res.send(true)
                        })
                        .catch(err => {
                            throw err
                            res.status(400).json({
                                msg: err
                            })
                        })
                } else {
                    res.status(400).json({
                        en: "Please select at least one file.",
                        pl: "Please select at least one file.",
                        de: "Please select at least one file.",
                        fr: "Veuillez tout remplir.",
                    })
                }

            } else {
                res.status(400).json({
                    en: "Please fill every thing.",
                    de: "Please fill every thing.",
                    pl: "Please fill every thing.",
                    fr: "Veuillez tout remplir.",
                })
            }

        })
    api.route('/meetings')
        .get((req, res) => {
            let met = new Meeting
            met.getAll().then(result => {
                    res.send(result)
                })
                .catch(err => {
                    res.status(404).send(err)
                })
        })
    api.route('/meetings/:language')
        .get((req, res) => {
            let met = new Meeting
            met.getByLanguage(req.params.language).then(result => {
                    res.send(result)
                })
                .catch(err => {
                    res.status(404).send(err)
                })
        })

    return api
}

module.exports = routes
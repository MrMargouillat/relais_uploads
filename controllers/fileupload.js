let express = require("express")
const Fichier = require("../models/fichier")
let language = require("../middlewares/language")

let routes = (upload) => {
    let fileuploadRoute = express.Router()
    fileuploadRoute.route('/upload')
        .post(language, upload.array('audio'), (req, res) => {
            // check if file send
            if (req.files !== "" && req.body.name !== "" && req.body.mail !== "" && req.body.title !== "") {
                if (req.files.length >= 1) {
                    let files = []
                    req.files.forEach((file) => {
                        files.push(new Fichier(file).saveWithDb(req.body.name, req.body.mail, req.body.title))
                    }, this)
                    Promise.all(files).then(result => {
                            // TODO : success redirect
                            res.redirect("/" + req.params.language + "/success")
                        })
                        .catch(err => {
                            throw err
                                // TODO : err redirect
                        })
                } else {
                    res.redirect("/" + req.params.language + "/error")
                }

            } else {
                console.log("field");
                res.redirect("/" + req.params.language + "/error")
            }

        })

    return fileuploadRoute
}

module.exports = routes
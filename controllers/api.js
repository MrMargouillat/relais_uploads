let express = require("express")
let Meeting = require("../models/meetings")

let routes = (upload) => {
    let api = express.Router()
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

    return api
}

module.exports = routes
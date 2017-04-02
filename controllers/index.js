let express = require("express")
let language = require("../middlewares/language")


let routes = () => {
    let indexRouter = express.Router()
    indexRouter.route('/')
        .get((req, res) => {
            res.redirect('/fr')
        })
    indexRouter.route('/404')
        .get((req, res) => {
            res.status(404).render("error/pages/error")
        })
    indexRouter.route('/:language')
        .get(language, (req, res) => {
            res.render(req.params.language + "/pages/relaisupload", function(err, html) {
                if (err) {
                    res.redirect("/404")
                }
                res.send(html)
            })
        })
    indexRouter.route('/:language/success')
        .get(language, (req, res) => {
            res.render(req.params.language + "/pages/success", function(err, html) {
                if (err) {
                    res.redirect("/404")
                }
                res.send(html)
            })
        })

    indexRouter.route('/:language/error')
        .get(language, (req, res) => {
            res.render(req.params.language + "/pages/error", function(err, html) {
                if (err) {
                    res.redirect("/404")
                }
                res.send(html)
            })
        })


    return indexRouter
}

module.exports = routes
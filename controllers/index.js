let express = require("express")



let routes = (language) => {
    let indexRouter = express.Router()
    indexRouter.route('/')
        .get((req, res) => {
            res.redirect('/en')
        })
    indexRouter.route('/:language(en|fr|de|pl)/error')
        .get(language, (req, res) => {
            res.status(500).render("pages/error")
        })
    indexRouter.route('/:language(en|fr|de|pl)')
        .get(language, (req, res) => {
            res.render("pages/relaisupload", function(err, html) {
                if (err) {
                    res.redirect("/" + req.params.language + "/error")
                }
                res.send(html)
            })
        })
    indexRouter.route('/:language(en|fr|de|pl)/success')
        .get(language, (req, res) => {
            res.render("pages/success", function(err, html) {
                if (err) {
                    res.redirect("/" + req.params.language + "/error")
                }
                res.send(html)
            })
        })

    indexRouter.route('/:language(en|fr|de|pl)/error')
        .get(language, (req, res) => {
            res.render("pages/error", function(err, html) {
                if (err) {
                    res.redirect("/" + req.params.language + "/error")
                }
                res.send(html)
            })
        })


    return indexRouter
}

module.exports = routes
function language(req, res, next) {
    let lang = ["fr", "en", "pl", "de"]
    res.locals.language = req.params.language
    if (!lang.slice(req.params.language)) {
        res.redirect("/404")
    }
    next()
}

module.exports = language
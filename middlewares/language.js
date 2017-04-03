var i18n = require('i18n');

function middleWare(dir) {
    i18n.configure({
        locales: ['en', 'fr', 'de'],
        directory: dir,
        defaultLocale: 'en',
    });

    return function language(req, res, next) {
        i18n.init(req, res)
        i18n.setLocale(req, req.params.language)
        next()
    }
}


module.exports = middleWare
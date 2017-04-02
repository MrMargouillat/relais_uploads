// Requires
let express = require("express")
let bodyParser = require('body-parser')
let  cookieSession  = require('cookie-session')
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})


let upload = multer({
    storage: storage
})

let app = express()

let PORT = process.env.port || 8080

app.set('view engine', 'ejs')

// Middleware
app.use('/static', express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())



// Routes
let api = require("./controllers/api")()
app.use("/api/", api)

let fileupload = require("./controllers/fileupload")(upload)
app.use("/:language/file/", fileupload)

let indexRouter = require("./controllers/index")()
app.use("/", indexRouter)


// Error 404
app.use((req, res, next) => {
    res.redirect("/404")
})

app.listen(PORT)
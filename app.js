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
let api = require("./controllers/api")(upload)
app.use("/api/", api)


let indexRouter = require("./controllers/index")()
app.use("/", indexRouter)


// custom 404 page
app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500).send('500 - Server Error');
});

app.listen(PORT)
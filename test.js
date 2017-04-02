var promisify = require("promisify-node");
var mysql = promisify("mysql");

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'relais'
});

let db = connection.connect();

let query = connection.query('INSERT INTO uploads SET ?', {
        "user_name": "user_name",
        "user_mail": "user_mail",
        "file_name": "name",
        "title": "title",
        "upload_date": new Date()
    },
    (err, result) => {
        if (err) throw err
    });
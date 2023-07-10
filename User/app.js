var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const storage = require('node-persist');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist",
});

con.connect();

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/userlogin', function (req, res) {
    res.render('index');
});

app.post('/userlogin', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var select_query = "SELECT * FROM user"

    con.query(select_query, function (error, results, fields) {
        if (error) throw error;
        res.redirect("/dashboard");
    })

})

app.get('/dashboard',function(req,res){
    
    var select_query="select * from task";

    con.query(select_query,async function(error,results,fields){
        if (error) throw error;
        res.render("dashboard", { results });
    })
})


app.listen(3000);
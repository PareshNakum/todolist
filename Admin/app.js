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

app.get('/admin', function (req, res) {
  res.render('index');
});

app.post('/admin', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (email === "admin@gmail.com" && password === "123") {
    res.redirect("dashboard");
  } else {
    res.send("Invalid Input");
  }
})

app.get('/dashboard', function (req, res) {

  var select_query = "select * from user";

  con.query(select_query, function (error, results, fields) {
    if (error) throw error;
    res.render("dashboard", { results });
  })
})
app.get("/adduser", function (req, res) {
  res.render("adduser");
});

app.post("/adduser", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var insert_query = "INSERT INTO user (name, email, password) VALUES ('" + name + "','" + email + "','" + password + "')";
  con.query(insert_query, function (error, results, fields) {
    if (error) throw error;
    res.redirect("/dashboard");
  });
});


app.get("/addtask", function (req, res) {
  res.render("addtask");
});

app.post("/addtask", function (req, res) {
  var taskName = req.body.name;
  var priority = req.body.priority;

  var insertTaskQuery = "INSERT INTO task (name, action) VALUES (?, ?)";
  con.query(insertTaskQuery, [taskName, priority], function (error, results, fields) {
    if (error) throw error;
    res.redirect("/dashboard");
  });
});



app.listen(3000);
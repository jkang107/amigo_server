// server.js
var express = require("express");
var connect = require('connect');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var fs = require('fs');
var compress = require('compression');

app.use(compress());

app.use(logfmt.requestLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

var mysql = require('mysql');
var ejs = require('ejs');


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.get('/mylist', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('mylist');
});


var client = mysql.createConnection({
    host:process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3307',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PW || '0724',
    database: process.env.DB_DATABASE || 'travel_buddy'
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});


/*app.get('/read', function(req, res) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log("error: " + err);
            return;
        }
        res.send(data);
    });
});

// TODO: write file implementation
app.post('/write', function(req, res) {
    console.log(req.body);

    fs.writeFile(file, JSON.stringify(req.body), function(err, data) {
        if (err) {
            console.log("error: " + err);
            return;
        }
        console.log("file written");
    });


    res.send(req.body);
});*/

app.post("/sendTravelInfo", function(req, res) {
    console.log(req.body);

    var curTime = req.body.time;
    console.log("----- time: " + curTime);
    var travelInfo = req.body.travelInfo;
    var userId = travelInfo.userId;
    var travelType = travelInfo.travel_type;

    var query;
    res.send("thank you client!");

    switch (travelType) {
        case "travelWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, when_to, country_from, comment, kakao_thumbnail, timestamp) VALUES ('" 
                + userId + "', '" + travelType + "', '" + travelInfo.sex + "', '" + travelInfo.age + "', '" 
                + travelInfo.when_from + "', '" + travelInfo.when_to + "', '" + travelInfo.country_from + "', '" + travelInfo.comment + "', '" + travelInfo.kakao_thumbnail + "', '" + curTime + "');");
            break;
        case "moveWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, country_from, country_to, city_from, city_to, transportation, comment, kakao_thumbnail, timestamp) VALUES ('" 
                + userId + "', '" + travelType + "', '" + travelInfo.sex + "', '" + travelInfo.age + "', '" + travelInfo.when_from + "', '" 
                + travelInfo.country_from + "', '" + travelInfo.country_to + "', '" + travelInfo.city_from + "', '" + travelInfo.city_to + "', '" 
                + travelInfo.transportation + "', '" + travelInfo.comment + "', '" + travelInfo.kakao_thumbnail + "', '" + curTime + "');");
            break;
        case "tourWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, when_to, country_from, tour_name, comment, kakao_thumbnail, timestamp) VALUES ('" 
                + userId + "', '" + travelType + "', '" + travelInfo.sex + "', '" + travelInfo.age + "', '" + travelInfo.when_from 
                + "', '" + travelInfo.when_to + "', '" + travelInfo.country_from + "', '" + travelInfo.tour_name + "', '" + travelInfo.comment + "', '" + travelInfo.kakao_thumbnail + "', '" + curTime + "');");
            break;
        case "foodWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, country_from, city_from, comment, kakao_thumbnail, timestamp) VALUES ('" 
                + userId + "', '" + travelType + "', '" + travelInfo.sex + "', '" + travelInfo.age + "', '" + travelInfo.when_from 
                + "', '" + travelInfo.country_from + "', '" + travelInfo.city_from + "', '" + travelInfo.comment + "', '" + travelInfo.kakao_thumbnail + "', '" + curTime + "');");
            break;
    }

    res.end();
});

app.post("/sendLoginInfo", function(req, res) {
    console.log(req.body);
    res.send("I got a user info!");

    var id = req.body.userInfo.id;
    var kakao_nickname = req.body.userInfo.properties.nickname;
    var kakao_thumbnail = req.body.userInfo.properties.thumbnail_image;

    client.query("INSERT ignore INTO users (Id, name, kakaoThumb) VALUES ('" + parseInt(id) + "', '" + kakao_nickname + "', '" + kakao_thumbnail + "');");

    res.end();
});

app.get("/getTravelList", function(req, res) {
    var query = client.query('select * from travel', function(err, rows) {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    });
    console.log(query);
});

var sendgrid = require('sendgrid')(process.env.SENDGRID_ID, process.env.SENDGRID_PW);

app.post("/sendMail", function(req, res) {
    sendgrid.send({
      to:       'uresj3@naver.com',
      from:     req.body.from,
      subject:  'Hello Developer!',
      text:     req.body.message,
      fromname: req.body.name
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
});

app.post("/getMyList", function(req, res) {
    var userId = parseInt(req.body.kakaoid);
    //console.log("++++++userId: " + userId);
    var queryString = 'select * from travel where userId = ' + userId;
    var query = client.query(queryString, function(err, rows) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });
    console.log(query);
});

app.post("/deleteItem", function(req,res) {
    var index = req.body.index;
    var queryString = 'delete from travel where `index` = ' + index;
    var query = client.query(queryString, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    });
})
// server.js
var express = require("express");
var connect = require('connect');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var fs = require('fs');
var file = __dirname + '/itinerary.json';


app.use(logfmt.requestLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

var mysql = require('mysql');
var ejs = require('ejs');

var client = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '0724',
    database: 'travel_buddy'
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});



app.get('/read', function(req, res) {
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
});

app.post("/sendTravelInfo", function(req, res) {
    console.log(req.body);

    var curTime = req.body.time;
    var travelInfo = req.body.travelInfo;
    var userInfo = req.body.userInfo;
    var userId = userInfo.userId;
    var travelType = userInfo.travel_type;

    var query;
    res.send("thank you client!");

    switch (travelType) {
        case "travelWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, when_to, country_from, comment) VALUES ('" + userId + "', '" + travelType + "', '" + userInfo.user_gender + "', '" + userInfo.user_age + "', '" + travelInfo.date_from + "', '" + travelInfo.date_to + "', '" + travelInfo.country_from + "', '" + travelInfo.comment + "');");
            break;
        case "moveWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, country_from, country_to, city_from, city_to, transportation, comment) VALUES ('" + userId + "', '" + travelType + "', '" + userInfo.user_gender + "', '" + userInfo.user_age + "', '" + travelInfo.date_from + "', '" + travelInfo.country_from + "', '" + travelInfo.country_to + "', '" + travelInfo.city_from + "', '" + travelInfo.city_to + "', '" + travelInfo.transportation + "', '" + travelInfo.comment + "');");
            break;
        case "tourWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, when_to, country_from, tour_name, comment) VALUES ('" + userId + "', '" + travelType + "', '" + userInfo.user_gender + "', '" + userInfo.user_age + "', '" + travelInfo.date_from + "', '" + travelInfo.date_to + "', '" + travelInfo.country_from + "', '" + travelInfo.tour_name + "', '" + travelInfo.comment + "');");
            break;
        case "foodWith":
            query = client.query("INSERT INTO travel (userId, type, sex, age, when_from, country_from, city_from, comment) VALUES ('" + userId + "', '" + travelType + "', '" + userInfo.user_gender + "', '" + userInfo.user_age + "', '" + travelInfo.date_from + "', '" + travelInfo.country_from + "', '" + travelInfo.city_from + "', '" + travelInfo.comment + "');");
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
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
});

//var messageFile = __dirname + '/messages.json';

// app.post('/sendMessage', function(req, res) {
//  var message = req.body;
//  res.send("thank you client!");
// });
//  pg.connect(connectionString, function(err, client) {
//      if(err) {
//          return console.error('error fetching client from pool', err);
//      }
//      console.log(message.message);
//      var query = client.query("INSERT INTO messages (msg_id, name, message, time) VALUES (DEFAULT, '" 
//                          + JSON.stringify(message.name) + "', '"
//                          + JSON.stringify(message.message) + "', '" 
//                          + JSON.stringify(message.time) + "');",
//          function(err, result) {
//              if (err) {
//                  console.log("ERROR: " + err);
//                  res.send("ERROR: " + err);
//                  return;
//              }
//              console.log("SUCCESS SEND!");
//              res.send("success send Message!");
//      });
//  });
// });

// app.get('/getMessages', function(req, res) {
//  pg.connect(connectionString, function(err, client) {
//      if(err) {
//          return console.error('error fetching client from pool', err);
//      }
//      var query = client.query('SELECT * FROM messages');
//      var concatenated = "";
//      query.on('row', function(row) {
//          console.log(JSON.stringify(row));
//          concatenated += JSON.stringify(row);
//      });
//      query.on('end', function() {
//          res.send(concatenated);
//          client.end();
//      });
//  });
// });



/*var pg = require('pg');
var localConnection = 'postgres://hwcfxbyewaiodb:CiLoioQgw8uajKojLfU5bW1VeQ@ec2-23-23-177-33.compute-1.amazonaws.com:5432/dgpekngq9m8hd?ssl=true';

var connectionString = process.env.DATABASE_URL || localConnection;

*/

//mysql://be05c449ff5b47:bd71dc8a@us-cdbr-iron-east-02.cleardb.net/heroku_1a66ebb3671a1f8?reconnect=true

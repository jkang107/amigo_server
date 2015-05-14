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
app.use(bodyParser.urlencoded());
app.use(cors());
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
/*var messageFile = __dirname + '/messages.json';

app.post('/sendMessage', function(req, res) {
	var message = req.body;

	pg.connect(connectionString, function(err, client) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		console.log(message.message);
		var query = client.query("INSERT INTO messages (msg_id, name, message, time) VALUES (DEFAULT, '" 
							+ JSON.stringify(message.name) + "', '"
							+ JSON.stringify(message.message) + "', '" 
							+ JSON.stringify(message.time) + "');",
			function(err, result) {
				if (err) {
					console.log("ERROR: " + err);
					res.send("ERROR: " + err);
					return;
				}
				console.log("SUCCESS SEND!");
				res.send("success send Message!");
		});
	});
});

app.get('/getMessages', function(req, res) {
	pg.connect(connectionString, function(err, client) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		var query = client.query('SELECT * FROM messages');
		var concatenated = "";
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
			concatenated += JSON.stringify(row);
		});
		query.on('end', function() {
			res.send(concatenated);
			client.end();
		});
	});
});


var pg = require('pg');
var localConnection = 'postgres://hwcfxbyewaiodb:CiLoioQgw8uajKojLfU5bW1VeQ@ec2-23-23-177-33.compute-1.amazonaws.com:5432/dgpekngq9m8hd?ssl=true';

var connectionString = process.env.DATABASE_URL || localConnection;


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});*/
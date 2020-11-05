var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/agriculture');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/process_post2', function (req, res) {
	var sellerID = req.body.sellerID;
	var sellerName = req.body.sellerName;
	var productNameseller = req.body.productNameseller;
	var quantitySell = req.body.quantitySell;
	var productAddress = req.body.productAddress;
	var sellRate = req.body.sellRate;

	var data = {
		"sellerID": sellerID,
		"sellerName": sellerName,
		"productNameseller": productNameseller,
		"quantitySell": quantitySell,
		"productAddress": productAddress,
		"sellRate": sellRate
	}


	db.collection('sell').insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

	return res.redirect('submit.html');
})


app.get('/', function (req, res) {
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000"); 

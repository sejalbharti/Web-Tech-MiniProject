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

app.post('/process_post6', function (req, res) {
    var sellerID = req.body.sellerID;
    var sellerName = req.body.sellerName;
    var Email = req.body.Email;
    var Address = req.body.Address;
    var Phone = req.body.Phone;

    var data = {
        "sellerID": sellerID,
        "sellerName": sellerName,
        "Email": Email,
        "Address": Address,
        "Phone": Phone
    }


    db.collection('reg').insertOne(data, function (err, collection) {
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

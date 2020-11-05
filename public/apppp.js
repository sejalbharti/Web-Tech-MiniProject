
var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/agriculture'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 


app.use(bodyParser.json()); 
app.use(express.static('../public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/process_post3', function(req,res){ 
	var buyerName = req.body.buyerName; 
	var productNamebuyer =req.body.productNamebuyer; 
	var quantityPurchase = req.body.quantityPurchase; 
    var deliveryAddress =req.body.deliveryAddress; 
 

	var data = { 
		"buyerName": buyerName, 
		"productNamebuyer":productNamebuyer, 
		"quantityPurchase":quantityPurchase, 
        "deliveryAddress":deliveryAddress
	} 
db.collection('purc').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('submit.html'); 
}) 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.redirect('purc.html'); 
}).listen(3000) 


console.log("server listening at port 3000");
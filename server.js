var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000 }}));

app.post("/login",(req,res) =>{
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.sendFile(__dirname + "/mypages/Home.html")
});


app.use(function (req,res,next){
    if(req.session.username){
        next();
    }else{
        res.sendFile(__dirname + "/mypages/Login.html")
    }
});

app.get("/",(req,res) => {
    console.log(req.session);
    console.log(req.sessionID);
    res.send("Express Sessions...!")
});

app.get("/products",(req,res) => {
    res.sendFile(__dirname + "/mypages/Products.html")
});

app.listen(3400,function(){
    console.log("Server running on 3400");
});
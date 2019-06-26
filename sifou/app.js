const express=require("express");
const bodyparser=require("body-parser");
const userApi=require("./api/userApi.js");
const dissApi=require("./api/diss.js");
var app=express();

app.listen(8080);
app.use(bodyparser.urlencoded({
	extended:false
}));
app.use(express.static("mypro"));
app.use("/userapi",userApi);
app.use("/dissapi",dissApi);
//使用express构建web服务器
const express=require('express');
const bodyParser=require('body-parser');

//引入路由模块
const admin=require("../admin");
const admin=require("../category");
const admin=require("../dish");
const admin=require("../setting");
const admin=require("../table");


var app=express();
var server=app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({
    extended:false
}));
//使用路由器来管理路由
app.use("/index",index);
app.use("/category",category);
app.use("/dish",dish);
app.use("/setting",setting);
app.use("/table",table);
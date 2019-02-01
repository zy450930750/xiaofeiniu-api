//创建MySQL连接池
const mysql=require('mysql');
var pool=mysql.createPool({
    // host:'127.0.0.1',
    // port:3306,
    // user:'root',
    // password:'',
    // database:'xiaofeiniu',
    // connectionLimit:10
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_ACCESSKEY,
    password : process.env.MYSQL_SECRETKEY,
    database : 'app_' + process.env.MYSQL_APPNAME,
    connectionLimit:3
});
//把创建好的连接池导出
module.exports=pool;
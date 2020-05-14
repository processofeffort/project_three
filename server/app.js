var express = require('express')
var app = new express()
var router = require('../src/router/users')
var router1 = require('../src/router/informations')
//解析http请求body中json和x-www-form-urlencoded类型的数据,引入body-parse中间件
bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})


app.use('/users', router) // 将路由注册到/users的路径下
app.use('/informations', router1) // 将路由注册到/infromation的路径下

var port = process.env.PORT || 3000

app.listen(port)
console.log('app is listening on port: ' + port)

//连接数据库
var url = "mongodb://localhost:27017/text"
var mongoose = require('mongoose')
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('db connect success')
    }
})
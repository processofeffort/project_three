var mongoose = require('../../server/node_modules/mongoose')

var informationSchema = new mongoose.Schema({
    uid: String,//获取文章id号
    ucontext: String,//获取文章评论内容
    uname:String,//获取评论者姓名
    utime: String//获取评论时间
})

module.exports = mongoose.model('Information', informationSchema)
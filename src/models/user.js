var mongoose = require('../../server/node_modules/mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    pass: String,
    nickName: String
})

module.exports = mongoose.model('User', userSchema)
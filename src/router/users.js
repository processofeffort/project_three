var express = require('express')
var router = express.Router()
var User = require('../models/user')
//登录账号接口
router.post('/validate',function(req,res){
    User.findOne({name: req.body.name, pass: req.body.pass},function(err, user){
        if (err) {
            console.log(err)
        }
        res.json(user)
    })
})
// router.route('/validate').post((req, res) => {
//     User.findOne({name: req.body.name, pass: req.body.pass}, (err, user) => {
//         if (err) {
//             console.log(err)
//         }
//         res.json(user)
//     })
// })
//注册账号接口
router.post('/register',function(req,res){
	User.findOne({name:req.body.name},function(err,user){
		if(err){
			res.send({'status': 1002, 'message': '查询失败', 'data': err});
		}
		else{
				let newName = new User({
					name:req.body.name,
					pass:req.body.pass,
					nickName:req.body.nickName
				});
				newName.save((err,user)=>{
					if(err){
						res.send({'status': 1002, 'message': '注册失败,用户名已存在！', 'data': err});
					}else{
						res.send({'status': 1000, 'message': '注册成功!'});
					}
				})
	}
	})
})

// router.route('/register').post((req,res)=>{
// 	User.findOne({name:req.body.name},(err,user)=>{
// 		if(err){
// 			res.send({'status': 1002, 'message': '查询失败', 'data': err});
// 		}
// 		else{
// 			console.log('查询成功'+user)
// 			if(user.length>0){
// 				res.send({'status': 1001, 'message': '该用户名已经注册！'});
// 			}
// 		else{
// 				let newName = new User({
// 					name:req.body.name,
// 					pass:req.body.pass,
// 					nickName:req.body.nickName
// 				});
// 				newName.save((err,user)=>{
// 					if(err){
// 						res.send({'status': 1002, 'message': '注册失败,用户名已存在！', 'data': err});
// 					}else{
// 						res.send({'status': 1000, 'message': '注册成功!'});
// 					}
// 				});
// 		}
// 	}
// 	})
// })
module.exports=router

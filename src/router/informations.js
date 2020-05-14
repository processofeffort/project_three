var express = require('express')
var router = express.Router()
var Information = require('../models/information')
//评论接口
router.route('/comment').post((req, res) => {
    Information.findOne({uname: req.body.uname}, (err, information) => {
        if (err) {
            console.log(err)
        }
       else{
       	let newComment = new Information({
          uid:req.body.uid,
          ucontext:req.body.ucontext,
          uname: req.body.uname,
          utime:req.body.utime
		});
		newComment.save((err,information)=>{
			if(err){
				res.send({'status': 1002, 'message': '评论失败！', 'data': err});
			}else{
				res.send({'status': 1000, 'message': '评论成功!'});
			}
		});
       }
    })
})
//显示评论接口
router.route('/showComment').get((req,res)=>{
	//find即sql语句
	 Information.find({}, (err, information) => {
	 	if (err) {
            console.log(err)
        }
        else{
        	 res.json(information)
        }
	 })
       })
//个人所有评论接口
router.route('/mComment').post((req,res)=>{
	Information.find({uname:req.body.uname},(err,information)=>{
		if(err){
			console.log(err)
		}
		else{
			res.json(information)
		}
	})
})
//删除评论接口
router.route('/dComment').post((req,res)=>{
	Information.remove({uname:req.body.uname,ucontext:req.body.ucontext},(err,information)=>{
		if(err){
			console.log(err)
		}
		else{
			res.json(information)
		}
	})
})
// 	var sql="select ucontext,uname,utime from information";
// 	Information.find((err, sql) => {
// 	if(sql){
// 		sql+="where uid='"+params.uid+"'";
// 		res.send(sql);
// 	}else{
// 		res.send(err);
// 	}
// })
module.exports=router

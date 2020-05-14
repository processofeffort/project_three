//验证用户名
export function isNumber(rule,value,callback){
	if(!value){
		return callback(new Error('用户名不能为空'));
	}
	setTimeout(()=>{
		const reg =/^[a-zA-Z0-9]{2,6}$/;
		const reCheck = reg.test(value);
		if(!reCheck){
			callback(new Error('用户名长度在2-6字符'));
		}
		else{
			callback();
		}
	})
}
//验证密码
export function isPassword(rule,value,callback){
	if(!value){
		return callback(new Error('密码不能为空'));
	}
	setTimeout(()=>{
		const reg =/^[a-zA-Z0-9]{6,16}$/;
		const reCheck = reg.test(value);
		if(!reCheck){
			callback(new Error('密码长度在6-16字符'));
		}
		else{
			callback();
		}
	})
}
//验证昵称
export function isName(rule,value,callback){
	if(!value){
		return callback(new Error('昵称不能为空'));
	}
	setTimeout(()=>{
		const reg =/^[a-zA-Z0-9]{2,5}$/;
		const reCheck = reg.test(value);
		if(!reCheck){
			callback(new Error('昵称长度在2-5字符'));
		}
		else{
			callback();
		}
	})
}
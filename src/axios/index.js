/*import axios from 'axios'
export function request(config){
	return new Promise((resolve,reject)=>{
		const instance = axios.create({
			baseURL:'http://localhost:3000'
		})
		instance(config).then(res=>{
			resolve(res)
		}).catch(res=>{
			reject(res)
		})
	})
}
*/
import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL="http://localhost:3000"
Vue.prototype.$ajax = axios

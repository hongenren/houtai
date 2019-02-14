'use strict'
import AdminModel from '../../models/admin/admin'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable' // 处理post表单提交的信息
import dtime from 'time-formater'


class Admin extends BaseComponent {
	constructor(){
		super()
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
	}
	async login (req, res, next) {
		var form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			
			const {username, password, status = 1} = fields;
			console.log(password);
			try{
				if (!username) {
					throw new Error('用户名为空')
				}else if(!password){
					throw new Error('密码为空')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			try{
				const admin = await AdminModel.findOne({username})
				if(!admin){
					const adminTip = status == 1 ? '管理员' : '超级管理员'
					const admin_id = await this.getId('admin_id');
					const cityInfo = '上海国烨';
					const newAdmin = {
						username:username, 
						password: password, 
						id: admin_id,
						create_time: dtime().format('YYYY-MM-DD HH:mm'),
						admin: adminTip,
						status,
						city: cityInfo					
					}
					await AdminModel.create(newAdmin)
					req.session.admin_id = admin_id;
					res.send({
						status: 1,
						success: '注册管理员成功',
					})
				}else if(password.toString() != admin.password.toString()){
					console.log('管理员登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '该用户已存在，密码输入错误',
					})
				}else{
					req.session.admin_id = admin.id;
					res.send({
						status: 1,
						success: '登录成功'
					})
				}
			}catch(error){
				console.log('登录管理员失败', err);
				res.send({
					status: 0,
					type: 'LOGIN_ADMIN_FAILED',
					message: '登录管理员失败',
				})
			}
		})
	}
	async register(req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const {username, password, status = 1} = fields;
			try{
				if (!username) {
					throw new Error('用户名错误')
				}else if(!password){
					throw new Error('密码错误')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			try{
				const admin = await AdminModel.findOne({username})
				if (admin) {
					console.log('该用户已经存在');
					res.send({
						status: 0,
						type: 'USER_HAS_EXIST',
						message: '该用户已经存在',
					})
				}else{
					const adminTip = status == 1 ? '管理员' : '超级管理员'
					const admin_id = await this.getId('admin_id');
					const newAdmin = {
						username:username, 
						password: password, 
						id: admin_id,
						create_time: dtime().format('YYYY-MM-DD'),
						admin: adminTip,
						status,
					}
					await AdminModel.create(newAdmin)
					req.session.admin_id = admin_id;
					res.send({
						status: 1,
						message: '注册管理员成功',
					})
				}
			}catch(err){
				console.log('注册管理员失败', err);
				res.send({
					status: 0,
					type: 'REGISTER_ADMIN_FAILED',
					message: '注册管理员失败',
				})
			}
		})
	}
	async singout(req, res, next){
		try{
			delete req.session.admin_id;
			res.send({
				status: 1,
				success: '退出成功'
			})
		}catch(err){
			console.log('退出失败', err)
			res.send({
				status: 0,
				message: '退出失败'
			})
		}
	}
}


export default new Admin()

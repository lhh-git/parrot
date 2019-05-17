//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		txt: '通知,是向特定受文对通知,是向特定受文对通知,是向特定受文对通知,是是向特定受文对通知,是'
	},
	onLoad: function (options) {
		console.log(this.data.txt.substring(0, 20))
		this.handleGetFormId()
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	// 获取模板消息
	handleGetFormId () {
		Require.ajax({
			loading: "1",   //是否开启loading
			url: "Api/Index/checkSignature",
			method: 'POST',
			param: {},
			success(res) {
				console.log(res)

			}
		})
	}








})





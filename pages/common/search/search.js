//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		search_val: '',
	},
	onLoad: function (options) {

	},
	//收集formId
	formSubmit (e) {
		console.log(1)
		Utils.getFormId(e); //获取formId	
	},
	//搜索框变化
	handleGetInputVal (e) {
		let search_val = e.detail.value;
		this.setData({
			search_val: search_val
		})
	},
	
	








})


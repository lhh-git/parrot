//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		
	},
	onLoad(options) {

	},
	onReady: function () { //获得popup组件
		this.picker = this.selectComponent("#picker");
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//获取三级联动
	handleGetPicker () {
		this.picker.showModal()
	}

	
})







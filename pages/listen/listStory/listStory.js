//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		items: [1,2,3],



	},
	onLoad: function (options) {
		
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//跳转到播放页
	handleOpenDetails () {
		wx.navigateTo({
			url: '/pages/listen/details/details?footerIndex=' + '0'
		})
	}







})



//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		
	},
	onLoad: function (options) {

	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//打开订单详情
	handleOpenVipOrderDetail () {
		wx.navigateTo({
			url: '/pages/personal/vipOrderDetail/vipOrderDetail',
		})
	}









})



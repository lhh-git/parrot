//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		imgUrls: [
			'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
			'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
			'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
		],
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		circular: true,
	},
	onLoad: function (options) {

	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//打开商品信息
	handleOpenVipOrderInfo () {
		wx.navigateTo({
			url: '/pages/personal/vipOrderInfo/vipOrderInfo',
		})
	}










})



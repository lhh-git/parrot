//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		show: false,   //简介
		footerIndex: '',	//底部菜单下标
	},
	onLoad: function (options) {
		console.log(options.id)
		this.setData({
			footerIndex: options.footerIndex
		})
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	//跳转到人气主播
	handleOpenPopularity () {
		wx.navigateTo({
			url: '/pages/listen/popularity/popularity',
		})
	},
	//订阅
	handleSubscribe () {
		console.log(2)
	},
	//点击展示简介
	handleSunopsisShow () {
		let show = !this.data.show;
		this.setData({
			show: show
		})
	}


})


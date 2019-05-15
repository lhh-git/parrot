//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		indicatorDots: true,
		autoplay: true,
		circular: true,
		interval: 5000,
		duration: 1000,
		
		userInfo: {},
		icons: [1,2,3]
	},
	onLoad: function (options) {
		this.handleGetUserInfo()
		this.handleGetSwiper()
	},
	//获取用户信息
	handleGetUserInfo () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/User/PersonalCenter",
			method: 'POST',
			param: {},
			success(res) {
				console.log(res)
				_this.setData({
					userInfo: res.data
				})
			}
		})
	},
	//打开vip订单列表页
	handleOpenVipOrderList () {
		wx.navigateTo({
			url: '/pages/personal/vipOrderList/vipOrderList',
		})
	},
	// 更多好物数据
	handleGetSwiper () {
		let icons = this.data.icons;
		const pages = [];
		icons.forEach((value, index) => {
			const page = Math.floor(index / 2)
			if (!pages[page]) {
				pages[page] = []
			}
			pages[page].push(value)
		})
		this.setData({
			icons: pages
		})
	}



})
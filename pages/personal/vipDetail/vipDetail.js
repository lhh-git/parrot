//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		userInfo: {}
	},
	onLoad: function (options) {
		this.handleGetUserInfo()
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
	}



})
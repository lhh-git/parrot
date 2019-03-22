//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {

	},
	onLoad: function (options) {

	},
	//获取用户信息
	handleGetUserInfo(e) {
		var userInfo = e.detail.userInfo;
		if (userInfo) {
			this.handleGetToken(userInfo)
			wx.redirectTo({
				url: '/pages/login/phone/phone'
			})
		} else {
			console.log('err')
		}
	},
	//获取token
	handleGetToken(userInfo) {
		var openId = wx.getStorageSync("openid");
		userInfo.openID = openId;

		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/User/wxLogin",
			method: 'POST',
			param: {
				userInfo: JSON.stringify(userInfo)
			},
			success(res) {
				console.log(res)
				
			}
		})
	},

	
})
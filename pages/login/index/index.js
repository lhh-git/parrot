//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {

	},
	onLoad: function (options) {
		//判断用户是否已经授权
		var _this = this;
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					//获取用户信息
					wx.getUserInfo({
						success: function (res) {
							_this.handleGetToken(res.rawData, 2)
						}
					});
				}
			}
		})
	},
	//获取用户信息
	handleGetUserInfo(e) {
		console.log(e)
		var userInfo = e.detail.userInfo;
		if (userInfo) {
			this.handleGetToken(userInfo, 1);
		} else {
			console.log('err')
		}
	},
	//获取token
	handleGetToken(userInfo, status) {
		if(status == '2') {
			var userInfo = JSON.parse(userInfo);
		}
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
				console.log(res);
				wx.setStorageSync("Token", res.Token);
				
				var phone = wx.getStorageSync("phone");
				if (phone) {
					wx.switchTab({
						url: '/pages/listen/listenIndex/listenIndex'
					})
				}else {
					wx.redirectTo({
						url: '/pages/login/phone/phone'
					})
				}
			}
		})
	},
	

	
})
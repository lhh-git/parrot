//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {

	},
	onLoad: function (options) {
		//判断用户是否已经授权
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					//获取用户信息
					wx.getUserInfo({
						success:res=>{
                            wx.setStorageSync("userInfo",res.rawData);
                            var phone = wx.getStorageSync("phone");
                            if (phone) {
                                wx.switchTab({
                                    url: '/pages/listen/listenIndex/listenIndex'
                                })
                            } else {
                                wx.redirectTo({
                                    url: '/pages/login/phone/phone'
                                })
                            }
						}
					});
				}
			}
		})
	},
	//获取用户信息
	handleGetUserInfo(e) {
		var userInfo = e.detail.userInfo;
        wx.setStorageSync("userInfo", JSON.stringify(e.detail.userInfo))
		if (userInfo) {
            var phone = wx.getStorageSync("phone");
            if (phone) {
                wx.switchTab({
                    url: '/pages/listen/listenIndex/listenIndex'
                })
            } else {
                wx.redirectTo({
                    url: '/pages/login/phone/phone'
                })
            }
		} else {
			console.log('err')
		}
	},
})
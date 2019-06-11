import Require from '../../../utils/require.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
		
	},

	getPhoneNumber(e) {
		var openId = wx.getStorageSync("openid");
        var session_key = wx.getStorageSync("session_key");
        var userInfo = wx.getStorageSync("userInfo")
        userInfo = JSON.parse(userInfo)
        console.log(userInfo)
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Login/register",
			method: 'POST',
			param: {
                openId: openId,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                city: userInfo.city,
                province: userInfo.province,
                country: userInfo.country,
                avatarUrl: userInfo.avatarUrl,
                session_key: session_key, 
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
			},
			success:res=> {
                console.log(res)
                wx.setStorageSync("id", res.userInfo.id);
                wx.setStorageSync("phone", res.userInfo.telPhone);
				wx.switchTab({
					url: '/pages/listen/listenIndex/listenIndex'
				})
			}
		})
	}
})

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
		// console.log(e)
		var openId = wx.getStorageSync("openid");
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/User/wxPhone",
			method: 'POST',
			param: {
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv,
				openID: openId,
			},
			success(res) {
				console.log( res)
				wx.setStorageSync("phone", res.data);
				wx.switchTab({
					url: '/pages/listen/listenIndex/listenIndex'
				})
			}
		})
	}
})
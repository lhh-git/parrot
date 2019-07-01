//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		userInfo: {},
        userInfo1: {},

	},
	onLoad: function (options) {
        const userInfo = JSON.parse(wx.getStorageSync("userInfo"))
        console.log(userInfo)
        this.setData({
            userInfo: userInfo
        })
		this.handleGetUserInfo()
	},
	onShow(){
        this.handleGetUserInfo()
    },
    //分享
    onShareAppMessage() {
        return Utils.onShareAppMessage()
    },
	handleGetUserInfo() {
        const userId = wx.getStorageSync("id")
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "User/getUnMessageCount",
			method: 'GET',
			param: {
                userID: userId
            },
			success:res=> {
				this.setData({
					userInfo1: res
				})
			}
		})
	}
})
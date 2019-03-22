//获取应用实例
const APP = getApp()
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'


Page({
    onLoad() {

    },
    handleGetUserInfo(e) {
        var userInfo = e.detail.userInfo;
        if (userInfo) {
            this.handleGetToken(userInfo)
			console.log(userInfo)
        } else {
            console.log('err')
        }
    },
	//获取用户信息和手机号
	getPhoneNumber(e) {
		console.log(e)
	},
    //获取token
    handleGetToken(userInfo) {
        var APP_URL = APP.globalData.Url
		var openId = wx.getStorageSync("openid");
		userInfo.openID = openId;
		

        wx.request({
            url: APP_URL + '/api/User/wxLogin',
            method: "POST",
            data: {
				userInfo: JSON.stringify(userInfo)
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
                if (res.data.code === 200) {
					APP.globalData.Token = res.data.Token;
                }
            },
            fail(err) {
                console.log(err)
            }
        })
    },




	login() {
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/getBanner",
			method: 'GET',
			param: {

			},
			success(res) {
				console.log(res)
			}
		})
	}






})
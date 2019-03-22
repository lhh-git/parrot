import Require from './utils/require.js'
App({
    onLaunch: function() {
		var APP_Url = this.globalData.Url;

		wx.login({
			success(res) {
				console.log('code-------'+res)
				Require.ajax({
					//loading: "1",   //是否开启loading
					url: "api/user/getOpenID",
					method: 'POST',
					param: {
						code: res.code
					},
					success(res) {
						console.log('openID-------' +res)
						wx.setStorageSync("openid", res.openID);
					}
				})
			}
		})
    },
    globalData: {
		Url: 'http://192.168.0.198',
		Token: ''
    }
})
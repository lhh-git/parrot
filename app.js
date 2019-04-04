import Require from './utils/require.js'
import Token from './utils/token.js'

App({
    onLaunch: function() {
		var _this = this;
		wx.login({
			success(res) {
				console.log(res)
				Require.ajax({
					// loading: "1",   //是否开启loading
					url: "api/user/getOpenID",
					method: 'POST',
					param: {
						code: res.code
					},
					success(res) {
						console.log(res)
						wx.setStorageSync("openid", res.openID);
					}
				})
			}
		})
		
    },
    globalData: {
		
    },
})
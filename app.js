import Require from './utils/require.js'

App({
    onLaunch: function() {
		var _this = this;
		//自动跟新版本
		// if (wx.canIUse('getUpdateManager')) {
		// 	const updateManager = wx.getUpdateManager()
		// 	updateManager.onCheckForUpdate(function (res) {
		// 		console.log('onCheckForUpdate====', res)
		// 		// 请求完新版本信息的回调
		// 		if (res.hasUpdate) {
		// 			console.log('res.hasUpdate====')
		// 			updateManager.onUpdateReady(function () {
		// 				wx.showModal({
		// 					title: '更新提示',
		// 					content: '新版本已经准备好，是否重启应用？',
		// 					success: function (res) {
		// 						console.log('success====', res)
		// 						// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
		// 						if (res.confirm) {
		// 							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		// 							updateManager.applyUpdate()
		// 						}
		// 					}
		// 				})
		// 			})
		// 			updateManager.onUpdateFailed(function () {
		// 				// 新的版本下载失败
		// 				wx.showModal({
		// 					title: '已经有新版本了哟~',
		// 					content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
		// 				})
		// 			})
		// 		}
		// 	})
		// }

		// 获取openID
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

		// 检测手机型号
		wx.getSystemInfo({
			success: function (res) {
				if (/iOS/ig.test(res.system)) {
					wx.setStorageSync("system", 'ios');
				}
				if (/Android/ig.test(res.system)) {
					wx.setStorageSync("system", 'andion');
				}
				
			}
		})
		
    },
    globalData: {
		
    },
})
import Token from './token.js'

var webUrl = "http://192.168.0.198/";
//网络请求方法
function ajax(model) {

	// Token.judgeGetSetting()

	var Token = wx.getStorageSync("Token");
	if (model.loading) {
		wx.showLoading({
			title: '加载中',
			mask: true
		})
	}
	wx.request({
		url: webUrl + model.url,
		data: model.param,
		header: {
			"content-type": "application/x-www-form-urlencoded",
			"token": Token
		},
		method: model.method,
		success: function (res) {
			// console.log(res)
			if (res.statusCode != 200) {
				wx.hideLoading()
				var title = res.statusCode.toString() 
				wx.showToast({
					title: title,
					icon: 'none',
					image: '/images/警告.svg',
					duration: 2000
				})
				return;
			}

			if (res.data.code === 80000) {
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 2000
				})
				return;
			}

			if(res.data.code != 200) {
				wx.hideLoading()
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 2000
				})
			}else {
				wx.hideLoading()
				model.success(res.data)
			}
		},
		fail: function (err) {
			wx.showToast({
				title: JSON.stringify(err),
				icon: 'none',
				duration: 2000
			})
		}
	})
}
// 导出模块
module.exports = {
	ajax: ajax
}
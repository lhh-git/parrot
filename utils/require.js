var webUrl = "http://192.168.0.198/";
//网络请求方法
function ajax(model) {
	if (model.loading) {
		wx.showLoading({
			title: '加载中',
		})
	}
	wx.request({
		url: webUrl + model.url,
		data: model.param,
		header: {
			"content-type": "application/x-www-form-urlencoded"
		},
		method: model.method,
		success: function (res) {
			if (res.statusCode != 200) {
				wx.hideLoading()
				var title = res.statusCode.toString()
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				})
				return;
			}
			if(res.data.code != 200) {
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
				title: err,
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
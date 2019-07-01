import Util from './util.js'

// var webUrl = "https://books.icpnt.com/";
var webUrl = "https://www.yingwutingshu.com/";

//网络请求方法
function ajax(model) {
	// 开启loading
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
            'content-type': 'application/x-www-form-urlencoded'
		},
		method: model.method,
		success: function (res) {
			wx.hideLoading()
			// 状态码报错
			if (res.statusCode != 200) {
				var title = res.statusCode.toString() 
				Util.showToast(title, 'err')
				return;
			}
			
			// //token过期
			// if (res.data.code === 80000) {
			// 	Util.showModal({
			// 		content: 'token已过期',
			// 		cancelText: '取消',
			// 		confirmText: '重新获取',
			// 		confirm () {
			// 			wx.navigateTo({
			// 				url: '/pages/login/index/index',
			// 			})
			// 		},
			// 		cancel () {
			// 			wx.navigateTo({
			// 				url: '/pages/login/index/index',
			// 			})
			// 		}		
			// 	})
			// 	return;
			// }

			wx.hideLoading()
			model.success(res.data)
			
		},
		fail: function (err) {
			wx.hideLoading()
			let title = JSON.stringify(err)
			Util.showToast(title, 'err')
		}
	})
}

// 文件上传
function uploadFile(model) {
	if (model.loading) {
		wx.showLoading({
			title: model.loading,
			mask: true
		})
	}
	wx.uploadFile({
		header: {
			"content-type": "application/x-www-form-urlencoded",
		},
		url: webUrl + model.url,
		filePath: model.filePath,
		name: 'file',
		formData: model.param,
		success(res) {
			wx.hideLoading()
			model.success(res.data)
		},
		fail: function (err) {
			wx.hideLoading()
			console.log(err)
		}
	})
}
	

// 导出模块
module.exports = {
	ajax: ajax,
	uploadFile: uploadFile
}
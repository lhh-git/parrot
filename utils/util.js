import Require from './require.js'
  
  const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const json2Form = (json) => {
	var str = [];
	for (var p in json) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
	}
	return str.join("&");
}

//Toast提示
const showToast = (title, icon, duration) => {
	wx.showToast({
		title: title, 	//文本最多显示 7个汉字长度
		icon: icon == 'success' ? icon : 'none',
		duration: duration || 2000,
		image: icon == 'err' ? '/images/toast_err.png' : icon == 'warn' ? '/images/toast_warn.png' : ''
	})
}

//modal弹窗
const showModal = (model) => {
    console.log(model)
	wx.showModal({
		content: model.content,
		cancelText: model.cancelText ? model.cancelText : '取消',
		cancelColor: '#000000',
		confirmText: model.confirmText ? model.confirmText : '确认',
		confirmColor: '#000000',
		success(res) {
			if (res.confirm) {
				model.confirm()
			} else if (res.cancel) {
				model.cancel()
			}
		}
	})
}

//退出页面关闭当前播放音乐
const closeMusic = () => {
	let system = wx.getStorageSync("system")
	if (system == 'ios') {
		innerAudioContext.stop()
	}
	if (system == 'andion') {
		innerAudioContext.destroy()
	}
}

	


//获取formId
const getFormId = (e) => {
	console.log(e.detail.formId)

		// < form bindsubmit="formSubmit" report-submit='true' >
		// 		<button class="formId" form-type="submit">添加标签</button>
		// </form>
	
	// Require.ajax({
	// 	loading: "1",   //是否开启loading
	// 	url: "api/collectFormID",
	// 	method: 'POST',
	// 	param: {
	// 		formID: e.detail.formId
	// 	},
	// 	success(res) {
	// 		console.log(res)
	// 	}
	// })

	// wx.request({
	// 	url: 'https://books.icpnt.com/api/collectFormID', // 仅为示例，并非真实的接口地址
	// 	method: "POST",
	// 	header: {
	// 		"content-type": "application/x-www-form-urlencoded"
	// 	},
	// 	data: {
	// 		formID: e.detail.formId
	// 	},
	// 	success(res) {
	// 		console.log(res)
	// 	}
	// })
}

//上拉刷新状态
const pullUpRefresh = (status) => {
	if (status == 'show') {
		wx.showNavigationBarLoading(); //在标题栏中显示加载
		return;
	}
	if (status == 'hide') {
		wx.hideNavigationBarLoading(); //完成停止加载
		wx.stopPullDownRefresh(); //停止下拉刷新
		return;
	}
}

//加载状态
const loadingData = (status, title) => {
	if (status == 'show') {
		wx.showNavigationBarLoading(); //在标题栏中显示加载
		wx.showLoading({
			title: title,
		})
		return;
	}
	if (status == 'hide') {
		wx.hideNavigationBarLoading(); //完成停止加载
		wx.hideLoading()
		return;
	}
}

//右上角分享页面
const onShareAppMessage = (title, path, url) => {
	return {
		title: title,   //标题
		path: path,		//路径
		imageUrl: url,  //图片
		success: function (res) {
			wx.showToast({
				title: '成功',
				icon: 'success',
				duration: 2000
			})
		},
		fail: function (res) {
			wx.showToast({
				title: '失败',
				icon: 'success',
				duration: 2000
			})
		}
	}
}

		

	

	

module.exports = {
	showToast,
	showModal,
	formatTime,
	json2Form,
	getFormId,
	pullUpRefresh,
	loadingData,
	onShareAppMessage,
	closeMusic

}

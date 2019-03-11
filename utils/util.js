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


//获取formId
const getFormId = (obj) => {
	console.log(obj)
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
const onShareAppMessage = (title, url) => {
	return {
		title: title,
		path: url,
		success: function (res) {
			wx.showToast({
				title: '成功',
				icon: 'success',
				duration: 2000
			})
		},
		fail: function (res) {
			wx.showToast({
				title: '成功',
				icon: 'success',
				duration: 2000
			})
		}
	}
}

		

	

	

module.exports = {
	formatTime: formatTime,
	getFormId: getFormId,
	pullUpRefresh: pullUpRefresh,
	loadingData: loadingData,
	onShareAppMessage: onShareAppMessage

}

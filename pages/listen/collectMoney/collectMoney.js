Page({
	data: {

	},
	onLoad: function (options) {
		wx.showActionSheet({
			itemList: ['A', 'B', 'C'],
			success(res) {
				console.log(res.tapIndex)
			},
			fail(res) {
				console.log(res.errMsg)
			}
		})
	},
	onReady: function () {

	},
	
	

})
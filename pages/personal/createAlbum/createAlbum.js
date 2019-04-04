//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		userInfo: {}
	},
	onLoad: function (options) {
		
	},
	//获取分类
	handleGetClassify() {
		wx.showActionSheet({
			itemList: ['A', 'B', 'C'],
			success(res) {
				console.log(res.tapIndex)
			},
			fail(res) {
				console.log(res.errMsg)
			}
		})
	}


})



//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		
	},
	onLoad() {
		
	},
	//点击朗读
	handleOpenRecord () {
		wx.navigateTo({
			url: '/pages/speak/record/record',
		})
	}

})


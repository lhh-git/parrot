//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		footerIndex: '',	//底部菜单下标
	},
	onLoad: function (options) {
		console.log(options)
		wx.setNavigationBarTitle({
			title: options.title
		})
		this.setData({
			footerIndex: options.footerIndex
		})
	},
	//打开听故事详情页
	handleOpenDetails () {
		wx.navigateTo({
			url: '/pages/listen/details/details',
		})
	}
	
	
	

})
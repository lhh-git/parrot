//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
	data: {
		
	},
	onLoad: function (options) {
		
	},
	handleWorksPlay() {
		wx.navigateTo({
			url: '/pages/speak/worksPlay/worksPlay',
		})
	}

})


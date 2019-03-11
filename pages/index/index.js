
//获取应用实例
const app = getApp()
import utils from '../../utils/util.js'

Page({
  onLoad() {
	  console.log(app.globalData.url)
	  utils.getFormId(12) 

	  utils.onShareAppMessage('鹦鹉听书', 'pages/index/index'); //右上角分享

	  

	},
	
	
	onPullDownRefresh() {
		utils.pullUpRefresh('show')
		setTimeout(function () {
			utils.pullUpRefresh('hide')	
		}, 1500);
	},
	
	handleNavigateIndex() {
		wx.switchTab({
			url: '/pages/listenStory/listenStory'
		})
	}
	
})

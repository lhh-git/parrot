//获取应用实例
const app = getApp()
import utils from '../../utils/util.js'

Page({
    onLoad() {
		utils.pullUpRefresh('show');
		setTimeout(function () {
			utils.pullUpRefresh('hide');
		}, 2000)
		console.log(1)
    },
	onPullDownRefresh() {
		utils.pullUpRefresh('show');
		setTimeout(function () {
			utils.pullUpRefresh('hide');
		}, 2000)
		console.log(1)
	},
	handleNavigateIndex() {
		wx.switchTab({
			url: '/pages/listenStory/listenStory'
		})
	}



})
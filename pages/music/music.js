//获取应用实例
const app = getApp()
import utils from '../../utils/util.js'
const innerAudioContext1 = wx.createInnerAudioContext();
const innerAudioContext2 = wx.createInnerAudioContext();

Page({
	onLoad() {
		utils.pullUpRefresh('show');
		setTimeout(function () {
			utils.pullUpRefresh('hide');
		}, 2000)
		this.handlePlayMusic();
	},
	onPullDownRefresh() {
		utils.pullUpRefresh('show');
		setTimeout(function () {
			utils.pullUpRefresh('hide');
		}, 2000)

	},
	handleNavigateIndex() {
		wx.switchTab({
			url: '/pages/listen/listenIndex/listenIndex'
		})

	},
	handlePlayMusic() {
		innerAudioContext1.src = "http://win.web.re01.sycdn.kuwo.cn/b00a12d6288c3e67b521464c4eb497bd/5c872666/resource/n3/78/63/1089932193.mp3";
		innerAudioContext1.volume = 0.3;
		innerAudioContext1.play();

		innerAudioContext2.src = "http://www.ytmp3.cn/down/58975.mp3";
		innerAudioContext2.volume = 0.1;
		innerAudioContext2.play();
	},


	formSubmit(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
	},
	formReset() {
		console.log('form发生了reset事件')
	}






})
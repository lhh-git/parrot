//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

//录音
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var timer = null;

Page({
	data: {
		control: false,		//开关
		recordInfo: {},     //录音信息
		time: 0,            //录制时长
	},
	onLoad: function (options) {
		console.log(options.recordInfo)
		// let recordInfo = JSON.parse(options.recordInfo);
		// this.setData({
		// 	recordInfo: recordInfo
		// }, () => {
		// 	console.log(this.data.recordInfo)
		// })
	},
	


})
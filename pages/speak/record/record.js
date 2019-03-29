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
		recordStart: false, //开启试听和下一步
		recordInfo: {},     //录音信息
		audition: false,    //试听
		time: 0,            //录制时长
	},
	onLoad: function (options) {
		//获取录音权限
		wx.authorize({
			scope: 'scope.record'
		})
	},
	//监测录音权限
	handleToggleRecord() {
		let _this = this;
		wx.getSetting({
			success: (res) => {
				if (!res.authSetting['scope.record']) {
					_this.openConfirm()
					return;
				}else {
					let control = !this.data.control;
					this.setData({
						control: control
					}, () => {
						this.data.control ? this.handleRecordStart() : this.handleRecordPause()
					})
				}
			}
		})
	},
	//重新获取用户录音授权
	openConfirm() {   
		wx.showModal({
			content: '检测到您没打开录音权限，是否去设置打开？',
			confirmText: "确认",
			cancelText: "取消",
			success: function (res) {
				if (res.confirm) {
					wx.openSetting({})
				}
			}
		});
	},
	//开始录音
	handleRecordStart() {
		innerAudioContext.stop()
		this.setData({
			recordStart: false
		})
		const options = {
			duration: 60000,//指定录音的时长，单位 ms
			sampleRate: 16000,//采样率
			numberOfChannels: 1,//录音通道数
			encodeBitRate: 96000,//编码码率
			format: 'mp3',//音频格式，有效值 aac/mp3
			frameSize: 50,//指定帧大小，单位 KB
		}
		//开始录音
		recorderManager.start(options);
		recorderManager.onStart(() => {
			clearInterval(timer);
			this.setData({
				time: 1
			})
			let time = 1;
			timer = setInterval(() => {
				time++;
				if(time >= 60) {
					clearInterval(timer);
				}
				console.log(time)
				this.setData({
					time: time
				})
			}, 1000)
		});
		recorderManager.onError((res) => { //错误回调
			// wx.showToast({
			// 	title: '录音异常',
			// 	icon: 'none',
			// 	duration: 2000
			// })
		});	
	},
	//暂停录音
	handleRecordPause() {
		recorderManager.pause()
		clearInterval(timer);
		this.handleRecordStop()
		this.setData({
			recordStart: true
		})
		
	},
	//结束录音
	handleRecordStop() {
		recorderManager.stop();
		recorderManager.onStop((res) => {
			console.log(res)
			this.setData({
				recordInfo: res
			})
		})
	},
	//试听
	handleRecordPlay() {
		let recordInfo = this.data.recordInfo;
		let audition = !this.data.audition;
		this.setData({
			audition: audition
		}, () => {
			if (this.data.recordStart) {
				if (this.data.audition) {
					innerAudioContext.src = recordInfo.tempFilePath;
					innerAudioContext.play()
				}else {
					innerAudioContext.pause()
				}
			}
		})
	},
	//下一步
	handleNext() {
		if (this.data.recordStart) {
			wx.navigateTo({
				url: '/pages/speak/dubbing/dubbing?recordInfo=' + encodeURIComponent(JSON.stringify(this.data.recordInfo))
			})
		}
	}


})
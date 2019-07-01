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
		id: '',				//故事id
		control: false,		//开关
		recordStart: false, //开启试听和下一步
		recordInfo: null,   //录音信息
		audition: false,    //试听
		time: 0,            //录制时长
		minute: 0,          //录制分钟数
        story:"",           //故事
        new:4
	},
	onLoad: function (options) {
        this.handleGetTellingStoryContent(options.id)
		this.setData({
			id: options.id
		})
		//获取录音权限
		wx.authorize({
			scope: 'scope.record'
		})
        // 新手引导
        if (wx.getStorageSync("new")) {
            this.setData({
                new: 4,
            })
        }else{
            this.setData({
                new:1,
            })
        }
	},
    onShow() {
        this.setData({
            audition: false
        })
        innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause()
        recorderManager.stop();
    },
    handleNumAdd(){
        if(this.data.new==1) {
            this.setData({
                new:2,
            })
            return;
        } 
        if (this.data.new == 2) {
            this.setData({
                new: 3,
            })
            return;
        } 
        if (this.data.new == 3) {
            this.setData({
                new: 4,
            })
            wx.setStorageSync("new","new")
            return;
        } 
    },
    //分享
    onShareAppMessage() {
        return Utils.onShareAppMessage()
    },
    //根据上页故事id获取内容
    handleGetTellingStoryContent(id) {
        let _this = this;
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "Speak/getStoryDetails",
            method: 'GET',
            param: {
                id: id
            },
            success(res) {
                console.log(res.data)
                _this.setData({
                    story: res.data
                })
            }
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
					_this.handleJudegRecord();
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
	//判断第一次录音还是多次录音
	handleJudegRecord () {
		let _this = this;
		let control = !this.data.control;
		if (this.data.recordInfo && this.data.control == false) {
			Utils.showModal({
				content: '重新录制会覆盖已录制的音频',
				cancelText: '取消',
				confirmText: '确认',
				confirm () {
					_this.setData({
						control: control
					}, () => {
						_this.data.control ? _this.handleRecordStart() : _this.handleRecordPause()
					})
				},
				cancel () {
					console.log('用户点击取消')
				}
			})
			return;
		}

		this.setData({
			control: control
		}, () => {
			this.data.control ? this.handleRecordStart() : this.handleRecordPause()
		})
		
	},
	//开始录音
	handleRecordStart() {
		const _this = this;
		innerAudioContext.stop()
        innerAudioContext.pause()
		this.setData({
			recordStart: false
		})
		const options = {
			duration: 600000,//指定录音的时长，单位 ms
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
				if (time >= 600) {
					clearInterval(timer);
					this.setData({
						recordStart: true
					})
				}
				console.log(time)
				this.setData({
					time: time,
					minute: Math.floor(time / 60)
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
	},
	//结束录音
	handleRecordStop() {
		recorderManager.stop();
		recorderManager.onStop((res) => {
			console.log(res)
			this.setData({
				recordInfo: res,
				recordStart: true
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
                    innerAudioContext.stop();
					innerAudioContext.pause()
				}
			}
		})
		innerAudioContext.onEnded((res) => {
			this.setData({
				audition: false
			})
		})
	},
	//下一步
	handleNext () {
		if (this.data.recordStart) {
			wx.navigateTo({
				url: '/pages/speak/dubbing/dubbing?recordInfo=' + encodeURIComponent(JSON.stringify(this.data.recordInfo)) 
				+ '&id=' + this.data.id
			})
		}
        innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause()
	},
	onUnload () {
        this.setData({
            audition: false
        })
		// let system = wx.getStorageSync("system")
		// if (system == 'ios') {
		// 	innerAudioContext.stop()
		// }
		// if (system == 'andion') {
        //     innerAudioContext.pause()
		// }
        innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause()
		recorderManager.stop();
	},
    onHide() {
        this.setData({
            audition: false
        })
        innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause()
        recorderManager.stop();
    }
	


})
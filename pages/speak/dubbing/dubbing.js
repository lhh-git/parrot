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
		control: true,		//开关
		recordInfo: {},     //录音信息
		duratio: '',        //总时长
		minute: 0,          //录制分钟数
		minute_play: 0,     //播放分钟数
		time: '',			//播放进度
		dbId: '',           //背景音乐id
        story:"",           //故事
	},
	onReady: function () { //获得popup组件
		this.modal = this.selectComponent("#modal");
		this.keep = this.selectComponent("#keep");
        this.canvas = this.selectComponent("#canvas");
	},
	onLoad: function (options) {
        this.handleGetTellingStoryContent(options.id)
		let recordInfo = JSON.parse(decodeURIComponent(options.recordInfo));
		let duration = Math.ceil(recordInfo.duration / 1000);
		this.setData({
			id: options.id,
			recordInfo: recordInfo,
			duration: duration,
			minute: Math.floor(duration / 60)
		}, () => {
			this.handlePlayMusic();
		})	
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
    // 页面卸载暂停播放&&回到开头
    onUnload() {
        this.setData({
            control: false
        })
        innerAudioContext.seek(0)
        innerAudioContext.destroy();
    },
	//播放录音
	handlePlayMusic() {
		// duration:1630
		// fileSize:28816
		innerAudioContext.src = this.data.recordInfo.tempFilePath;
		innerAudioContext.play();
	
		//监听播放进度
		innerAudioContext.onTimeUpdate(() => {
			let time = Math.ceil(innerAudioContext.currentTime);
			this.setData({
				time: time,
				minute_play: Math.floor(time / 60)
			})
		})

		//自然播放至结束
		innerAudioContext.onEnded(() => {
			this.setData({
				control: false,
                time: this.data.duration
			})
		})
			
	},
	//切换播放状态
	handleTogglePlay() {
		let control = !this.data.control;
		this.setData({
			control: control
		}, () => {
			if (control) {
				innerAudioContext.play();
			}else {
				innerAudioContext.pause()
			}
		})
	},




	// 
	// 
	// 
	// 
	//配乐
	//打开配乐列表
	handleOpenDubbing() {
		this.modal.showModal();
	},
	//获取子组件传过来的配乐id
	getDubbingIndex: function (e) {
		this.setData({
			dbId: e.detail.id
		})

	},
   

	//点击录制完成
	handleOpenUpload() {
		this.keep.showModal();
	},
    // 生成海报
    handleCreateCanvas() {
        this.canvas.handleGetCanvalInfo()
    }

	
	


})
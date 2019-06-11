//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

let innerAudioContext = wx.createInnerAudioContext()
let bgm = wx.createInnerAudioContext()
Page({
	data: {
		time: 0,            //录制时长
		id: '',			//故事id
        list: {}, 		//故事信息
		three: [],		//优秀读者前三
		excellent: [],	//优秀读者不含三
        minute_play: 0,
        imgPath: "",
        tabIndex: "",
        audioPath: "",   //录音路径
        sort: 0,         //专辑播放到第几个
        width: "",
        control: true,
        bgm:"",
        audioPath1:"",
	},
	onLoad: function (options) {
        this.setData({
            id: options.id,
            imgPath: APP.globalData.imgPath,
            audioPath1: APP.globalData.audioPath,
        },()=>{
            this.handleList()
        })

	},
	onReady: function () { //获得popup组件
		this.canvas = this.selectComponent("#canvas");
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	// 转发
	onShareAppMessage() {

	},
    handleList() {
        const userId = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: 'Speak/getUserStoryDetails',
            method: 'GET',
            param: {
                id:this.data.id,
                userID: userId
                
            },
            success: res => {
                if (res.code == 200) {
                    this.setData({
                        list: res.data,
                        audioPath: res.data.audioPath,
                        bgm: res.data.musicInfo?res.data.musicInfo.audioPath:""
                    },()=>{
                        if (res.data.musicInfo){
                            this.handleBgm()
                        }else{
                            this.handlePlayMusic1()
                        }
                    })
                }
            }
        })
    },
    handleCollect(){
        const userId = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: 'Speak/collectUserStory',
            method: 'POST',
            param: {
                userStoryID: this.data.id,
                userID: userId

            },
            success: res => {
                if (res.code == 200) {
                    this.handleList()
                }
            }
        })
    },
    //点击朗读
    handleOpenRecord() {
        wx.navigateTo({
            url: '/pages/speak/record/record?id=' + this.data.list.storyInfo.id,
        })
    },
    //切换播放状态
    handleTogglePlay() {
        let control = !this.data.control;
        this.setData({
            control: control
        }, () => {
            if (control) {
                bgm.play()
                innerAudioContext.play();
            } else {
                bgm.pause()
                innerAudioContext.pause()
                
            }
        })
    },
    onShow() {
        bgm.play()
        innerAudioContext.play();
    },
    handleBgm() {
        innerAudioContext = wx.createInnerAudioContext()
        bgm = wx.createInnerAudioContext()
        bgm.src = this.data.audioPath1 + this.data.bgm;
        if (this.data.control) {
            innerAudioContext.play();
            wx.showLoading({
                title: '加载中',
                mask: true
            })
        } else {
            innerAudioContext.pause()
        } 
        bgm.play()
        bgm.onPlay(() => {
            wx.hideLoading()
            this.handlePlayMusic()
        });
        
    },
    handlePlayMusic1() {
         this.handlePlayMusic()
    },
    //播放录音
    handlePlayMusic() {
        innerAudioContext.src = this.data.audioPath1 + this.data.audioPath;
        innerAudioContext.play()
        innerAudioContext.onPlay(() => {
            wx.hideLoading()
        });
        // 监听播放进度
        var h = 0, m = 0, s = 0
        setTimeout(() => {
            // 按照官方沒用 加断点 加下面这个才会执行
            innerAudioContext.duration
            innerAudioContext.onTimeUpdate(() => {
                let time = Math.floor(innerAudioContext.currentTime);
                s = time - (h * 60 * 60) - (m * 60)
                let duration = Math.floor(innerAudioContext.duration / 60)
                let duration1 = Math.floor(innerAudioContext.duration % 60)
                if (duration.toString().length == 1) {
                    duration = '0' + duration;
                }
                if (duration1.toString().length == 1) {
                    duration1 = '0' + duration1;
                }
                duration = duration + ":" + duration1
                if (s > 59) {
                    m++
                }
                if (m > 59) {
                    h++
                    m = 0
                }
                if (s.toString().length == 1) {
                    s = '0' + s;
                }
                if (m.toString().length == 1) {
                    m = '0' + m;
                }
                if (h.toString().length == 1) {
                    h = '0' + h;
                }
                time = m + ":" + s
                this.setData({
                    time: time,
                    duration: duration,
                    minute_play: (Math.ceil(innerAudioContext.currentTime)/Math.ceil(innerAudioContext.duration))
                })
            })
        },100)
        //自然播放至结束
        innerAudioContext.onEnded(() => {
            h = 0; m = 0; s = 0
            bgm.pause()
            this.setData({
                control: false,
                minute_play:1,
            })
        })

    },
	// 生成海报
	handleCreateCanvas () {
		this.canvas.handleGetCanvalInfo()
	},
    // 页面卸载暂停播放&&回到开头
    onUnload() {
        this.setData({
            control: false
        })
        // innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause()
        // bgm.seek(0)
        bgm.stop();
        bgm.pause()
    },
    handleUrl(e) {
        const id = e.currentTarget.dataset.id
        if (!id) {
            return;
        }
        wx.navigateTo({
            url: "/pages/listen/popularity/popularity?id=" + id + "&footerIndex=1"
        })
    }
})
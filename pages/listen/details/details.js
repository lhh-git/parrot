//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

const recorderManager = wx.getRecorderManager()
let innerAudioContext = wx.createInnerAudioContext()
var timer = null;
var pageX = 0
Page({
	data: {
		show: false,         //简介
		footerIndex: '',	//底部菜单下标
        control: true,
        story:"",
        time:"",
        minute_play:0,
        imgPath:"",
        tabIndex:"",
        audioPath:"",   //录音路径
        sort:0,         //专辑播放到第几个
        width:"",
        audioPath1:"",  //录音路径补全
	},
	onLoad: function (options) {
        this.handleGetTellingStoryContent(options.id,0)
        this.handleAdd(options.id)
		this.setData({
			footerIndex: options.footerIndex,
            id: options.id,
            tabIndex: options.id,
            imgPath: APP.globalData.imgPath,
            audioPath1: APP.globalData.audioPath
		})
	},
    //根据上页故事id获取内容
    handleGetTellingStoryContent(id,index=1) {
        const userid = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "Index/getStoryDetails",
            method: 'GET',
            param: {
                id: id,
                userID: userid,
            },
            success:res=> {
                if(res.code==200) {
                    this.setData({
                        story: res.data,
                        audioPath: res.data.audioPath
                    },()=>{
                        if(index==0){
                            this.handlePlayMusic()
                        }
                    })
                }
            }
        })
    },
    // 增加播放量
    handleAdd(id) {
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "Index/addPlayNum",
            method: 'POST',
            param: {
                id: id,
            },
            success: res => {
        
            }
        })
    },
	//获取fromId
	formSubmit (e) {
		Utils.getFormId(e);
	},
    // 上一曲
    handlePrev() {
        let sort = this.data.sort
        const num = this.data.story.albunStoryList.length
        if (!num || num == 1) {
            return;
        }
        sort--
        if (sort == -1) {
            sort = num - 1
        }
        this.setData({
            sort: sort,
            audioPath: this.data.story.albunStoryList[sort].audioPath,
            tabIndex: this.data.story.albunStoryList[sort].id
        },()=>{
            this.handlePlayMusic()
        })
    },
    // 下一曲
    handleNext() {
        let sort = this.data.sort
        const num = this.data.story.albunStoryList.length
        if (!num || num==1) {
            return;
        }
        sort++
        if (sort == num) {
            sort = 0
        }
        this.setData({
            sort:sort,
            audioPath: this.data.story.albunStoryList[sort].audioPath,
            tabIndex: this.data.story.albunStoryList[sort].id
        },()=>{
            this.handlePlayMusic()
        })
    },
	//跳转到人气主播
	handleOpenPopularity () {
		wx.navigateTo({
            url: '/pages/listen/popularity/popularity?id=' + this.data.story.authorID,
		})
	},
	//订阅
	handleSubscribe () {
		console.log(2)
	},
	//点击展示简介
	handleSunopsisShow () {
		let show = !this.data.show;
		this.setData({
			show: show
		})
	},
    //切换播放状态
    handleTogglePlay() {
        let control = !this.data.control;
        this.setData({
            control: control
        }, () => {
            if (control) {
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                innerAudioContext.play(); 
            } else {
                innerAudioContext.pause()
            }
        })
    },
    onShow () {
        // innerAudioContext = wx.createInnerAudioContext()
        // this.handlePlayMusic()
        this.handleGetTellingStoryContent(this.data.id)
    },
    onHide() {
        this.setData({
            control: false
        })
        innerAudioContext.pause();
        innerAudioContext.stop();
    },
    //播放录音
    handlePlayMusic() {
        innerAudioContext.src = this.data.audioPath1 + this.data.audioPath;
        if (this.data.control) {
            innerAudioContext.play();
            wx.showLoading({
                title: '加载中',
                mask: true
            })
        } else {
            innerAudioContext.pause()
        } 
        innerAudioContext.onPlay(()=>{
            wx.hideLoading()
        });
        // 监听播放进度
        var h = 0, m = 0, s = 0
        setTimeout(() => {
            // 按照官方沒用 加断点 加下面这个才会执行
            innerAudioContext.duration
            innerAudioContext.onTimeUpdate(() => {
                let time = Math.floor(innerAudioContext.currentTime);
                s=time-(h*60*60)-(m*60)
                let duration = Math.floor(innerAudioContext.duration/60)
                let duration1 = Math.floor(innerAudioContext.duration % 60)
                if (duration.toString().length == 1) {
                    duration = '0'+duration;
                }
                if (duration1.toString().length == 1) {
                    duration1 = '0' + duration1;
                }
                duration = duration + ":" + duration1
                if (s > 59) {
                    m++
                }
                if (m > 59){
                    h++
                    m=0
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
                time= h+":"+m+":"+s
                this.setData({
                    time: time,
                    duration: duration,
                    minute_play: (innerAudioContext.currentTime/innerAudioContext.duration)
                })
            })
        }, 500)
        //自然播放至结束
        innerAudioContext.onEnded(() => {
            h = 0; m = 0;s = 0
            this.setData({
                control: false
            })
        })

    },
    // 收藏故事
    handleCollect() {
        const userid = wx.getStorageSync("id")
        const storyID = this.data.story.id
        console.log(storyID)
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/collectStory",
            method: 'POST',
            param: {
                storyID: storyID,
                userID: userid
            },
            success: res => {
                if (res.code==200) {
                    Utils.showToast(res.msg,"success")
                    this.handleGetTellingStoryContent(this.data.id)
                }else{
                    Utils.showToast(res.msg,"err")
                }
            }
        })
    },
     // 收藏专辑
    handleAlbum() {
        const userid = wx.getStorageSync("id")
        const albumID = this.data.story.albumID
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/collectAlbum",
            method: 'POST',
            param: {
                albumID: albumID,
                userID: userid,
            },
            success: res => {
                if (res.code == 200) {
                    Utils.showToast(res.msg, "success")
                    this.handleGetTellingStoryContent(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },
    // 收藏作者
    handleAuthor() {
        const userid = wx.getStorageSync("id")
        const authorID = this.data.story.authorID
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/collectAuthor",
            method: 'POST',
            param: {
                authorID: authorID,
                userID: userid,
            },
            success: res => {
                if (res.code == 200) {
                    Utils.showToast(res.msg, "success")
                    this.handleGetTellingStoryContent(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },
    // 播放切换
    handletab (e) {
        const id = e.currentTarget.dataset.id;
        const path = e.currentTarget.dataset.path;
        this.setData({
            tabIndex: id,
            audioPath:path
        },()=>{
            this.handlePlayMusic()
        })
    },
    // 页面卸载暂停播放&&回到开头
    onUnload() {
        this.setData({
            control: false
        })
        // innerAudioContext.seek(0)
        innerAudioContext.stop();
        innerAudioContext.pause();
    },
})


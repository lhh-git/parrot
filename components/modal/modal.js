//获取应用实例
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'
const APP = getApp()
//录音
const recorderManager = wx.getRecorderManager()
let myaudio = wx.createInnerAudioContext()

Component({
	// properties: {
	// 	list: {               // 属性名
	// 		type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
	// 		value: ''         // 属性初始值（可选），如果未指定则会根据类型选择一个
	// 	}
	// },
	data: {
		hideModal: true, //模态框的状态  true-隐藏  false-显示
		animationData: {},//
		
		list: [],				
		inputValue: '',		  //搜索框
		id: 0,				  //配乐类型id
		play: false,          //配乐状态
		playId: '',           //配乐id
		dubbingId: '',        //使用配乐id
        musicList:'',
        imgPath:"",
        audioPath:"",
	},
	lifetimes: {
		attached() {	// 在组件实例进入页面节点树时执行
			this.handleGetInfo()  //弹出配乐列表
            this.setData({
                imgPath: APP.globalData.imgPath,
                audioPath: APP.globalData.audioPath
            })
		},
	},
	methods: {
       
		// 显示遮罩层
		showModal: function () {
            myaudio = wx.createInnerAudioContext()
			var that = this;
			that.setData({
				hideModal: false
			})
			var animation = wx.createAnimation({
				duration: 200,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
				timingFunction: 'ease',//动画的效果 默认值是linear
			})
			this.animation = animation
			setTimeout(function () {
				that.fadeIn();//调用显示动画
			}, 300)
		},
		// 隐藏遮罩层
		hideModal: function () {
            myaudio.seek(0)
            myaudio.destroy();
			var that = this;
			var animation = wx.createAnimation({
				duration: 200,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
				timingFunction: 'ease',//动画的效果 默认值是linear
			})
			this.animation = animation
			that.fadeDown();//调用隐藏动画   
			setTimeout(function () {
				that.setData({
                    play:false,
					hideModal: true
				})
			}, 200)//先执行下滑动画，再隐藏模块

		},
		//动画集
		fadeIn: function () {
			this.animation.translateY(0).step()
			this.setData({
				animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
			})
		},
		fadeDown: function () {
			this.animation.translateY(1000).step()
			this.setData({
				animationData: this.animation.export(),
			})
		},
		
		

		//获取组件数据
		handleGetInfo() {
            let userId = wx.getStorageSync("id")
			Require.ajax({
				//loading: "1",   //是否开启loading
                url: "Speak/getMusicTypeList",
				method: 'GET',
				param: {
                    userID: userId
                },
				success:res=> {
					this.setData({
						list: res.data,
                        id: res.data[0].id
                        
					},()=>{
                        console.log(this.data.id)
                        this.getMusicList()
                    })
				}
			})
		},
        //获取组件数据
        getMusicList() {
            let userId = wx.getStorageSync("id")
            Require.ajax({
                //loading: "1",   //是否开启loading
                url: "Speak/getMusicList",
                method: 'GET',
                param: {
                    typeID:this.data.id,
                    userID: userId
                },
                success: res => {
                    console.log(res)
                    this.setData({
                        musicList: res.data
                    })
                }
            })
        },
		//关闭配乐组件
		handleCloseModel() {
            myaudio.seek(0)
            myaudio.destroy();
			this.hideModal()
            this.setData({
                play: false,
            })
		},
		//切换配乐类型
		handleToggleDubbingType(e) {
			this.setData({
				id: this.data.list[e.currentTarget.dataset.index].id
			},()=>{
                this.getMusicList()
            })
		},
		//播放音乐
		handlePlayMusic(e) {
			let play = !this.data.play
			let id = e.currentTarget.dataset.id
            let music = e.currentTarget.dataset.music
			console.log(music)
			if (this.data.playId == id || this.data.playId == '') {
				this.setData({
					play: play,
					playId: id
				}, () => {
					this.handleGetMusic(music)
				})
			}else {
				this.setData({
					play: true,
					playId: id
				}, () => {
					this.handleGetMusic(music)
				})
			}	
		},
		//根据状态判断播放哪首
		handleGetMusic(url) {
			if (this.data.play) {
				myaudio.src = url
				myaudio.play()
			}else {
				myaudio.pause()
			}
		},
		//点击使用
		handleConfirmUse(e) {
            myaudio.seek(0)
            myaudio.destroy();
			this.hideModal() 
			this.setData({
                play:false,
				dubbingId: e.currentTarget.dataset.id
			})
		},
		//收藏与取消收藏
		handleCollect(e) {
			let _this = this;
			let id = e.currentTarget.dataset.id;
			let userId = wx.getStorageSync("id")
            Require.ajax({
                //loading: "1",   //是否开启loading
                url: "Speak/collectMusic",
                method: 'POST',
                param: {
                    musicID: id,
                    userID: userId
                },
                success(res) {
                    console.log(res)
                    if (_this.data.inputValue) {
                        _this.handleSearchList()
                    }else{
                        _this.getMusicList()
                    }
                }
            })
		},
		//搜索
		handleGetSearch(e) {
			this.setData({
                inputValue: e.detail.value
			}, () => {
                this.handleSearchList()
			})
		},
        handleSearchList () {
            let _this = this;
            let userId = wx.getStorageSync("id")
            if (this.data.inputValue == '') {
                this.handleGetInfo()
                return;
            }
            Require.ajax({
                //loading: "1",   //是否开启loading
                url: "Speak/searchMusic",
                method: 'GET',
                param: {
                    keyWord: this.data.inputValue,
                    userID: userId
                },
                success(res) {
                    _this.setData({
                        musicList: res.data
                    })
                }
            })
        },
		//给父组件传值
		handleGetIndex() {
			this.triggerEvent('myevent', {id: this.data.dubbingId });
		},


	}
	
	



})


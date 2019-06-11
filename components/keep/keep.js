//获取应用实例
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'

//录音
const recorderManager = wx.getRecorderManager()
const myaudio = wx.createInnerAudioContext()

Component({
	properties: {
		storyId: {
			type: [Number, String]
		},
		dbId: {
			type: [Number, String]
		},
		url: {
			type: String
		}
	},
	data: {
		hideModal: true, //模态框的状态  true-隐藏  false-显示
		animationData: {},//

	},
    
	lifetimes: {
		attached() {	// 在组件实例进入页面节点树时执行
			
		},
	},
	methods: {
        // 生成海报
        handleCreateCanvas () {
            this.hideModal()
            this.triggerEvent('myevent')
        },
		// 显示遮罩层
		showModal: function () {
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
			var that = this;
			var animation = wx.createAnimation({
				duration: 200,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
				timingFunction: 'ease',//动画的效果 默认值是linear
			})
			this.animation = animation
			that.fadeDown();//调用隐藏动画   
			setTimeout(function () {
				that.setData({
					hideModal: true
				})
			}, 300)//先执行下滑动画，再隐藏模块

		},
		//动画集
		fadeIn: function () {
			this.animation.translateY(0).step()
			this.setData({
				animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
			})
		},
		fadeDown: function () {
			this.animation.translateY(352).step()
			this.setData({
				animationData: this.animation.export(),
			})
		},


		//存草稿
		handleKeepDraft() {
			this.hideModal()
			this.handleSaveDrafts()		
		},
		handleSaveDrafts () {
            // if (!this.data.dbId) {
            //     Utils.showToast('请选择配乐', 'err')
            //     return;
            // }
            let userId = wx.getStorageSync("id")
			Require.uploadFile({
				loading: '正在上传',
                url: "Speak/saveStory", 
				filePath: this.data.url,
				name: 'file',
                param: {
                    isDraft:0,
                    userID : userId,
                    storyID: this.data.storyId,
                    musicID: this.data.dbId || "",
				},
				success:res=> {
                    const data = JSON.parse(res)
                    if (data.code==200){
                        Utils.showToast(data.msg,"success")
                        wx.navigateTo({
                            url:"/pages/personal/listDrafts/listDrafts?id=0"
                        })
                    }else{
                        Utils.showToast(data.msg)
                    }
				}
			})

			
		
		},
		//上传作品
		handleOpenStoredWorks() {
            // if (!this.data.dbId) {
            //     Utils.showToast('请选择配乐', 'err')
            //     return;
            // }
            let userId = wx.getStorageSync("id")
            Require.uploadFile({
                loading: '正在上传',
                url: "Speak/saveStory",
                filePath: this.data.url,
                name: 'file',
                param: {
                    isDraft: 1,
                    userID: userId,
                    storyID: this.data.storyId,
                    musicID: this.data.dbId || "",
                },
                success(res) {
                    const data = JSON.parse(res)
                    if (data.code == 200) {
                        Utils.showToast('上传成功', 'success')
                        wx.navigateTo({
                            url: '/pages/personal/listStory/listStory?id=0&title=默认专辑',
                        })
                    } else {
                        Utils.showToast(data.msg)
                    }
                }
            })
		}
	},


})


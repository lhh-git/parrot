//获取应用实例
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'

//录音
const recorderManager = wx.getRecorderManager()
const myaudio = wx.createInnerAudioContext()

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

	},
	lifetimes: {
		attached() {	// 在组件实例进入页面节点树时执行
			
		},
	},
	methods: {
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
			console.log('存草稿')

		},
		//上传作品
		handleOpenStoredWorks() {
			wx.navigateTo({
				url: '/pages/speak/storedWorks/storedWorks',
			})
		}
		
		
	}




})


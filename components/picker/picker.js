//获取应用实例
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'

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
		provinces: ['山西', '河北', '河南'],
		citys: ['太原', '石家庄', '郑州'],
		areas: ['杏花岭', '小店', '迎泽']
		
	},
	bindChange(e) {
		
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



		//三级联动
		bindChange (e) {
			const val = e.detail.value
			console.log(val)
			// this.setData({
			// 	year: this.data.years[val[0]],
			// 	month: this.data.months[val[1]],
			// 	day: this.data.days[val[2]]
			// })
		},
		//取消
		handlePickerClear() {
			this.hideModal()
		},
		//确定
		handlePickerConfirm () {
			this.hideModal()
		},
		
		
		


		//给父组件传值
		// handleGetIndex() {
		// 	this.triggerEvent('myevent', { id: this.data.dubbingId });
		// },


	}




})


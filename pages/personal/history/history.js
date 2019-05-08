//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["作者", "专辑", "音频"],
		menu_id: 0,
		classify: ["exchange_bonus.png", "exchange_commission.png", "exchange_egg.png"],
		classify_id: 0,

		//侧滑删除
		items: [],
		startX: 0, //开始坐标
		startY: 0
	},
	onLoad: function (options) {
		for (var i = 0; i < 10; i++) {
			this.data.items.push({
				content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
				isTouchMove: false //默认隐藏删除
			})
		}
		this.setData({
			items: this.data.items
		});
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//菜单切换
	handleToggleMenu(e) {
		const index = e.currentTarget.dataset.index;
		this.setData({
			menu_id: index
		})
	},



	//手指触摸动作开始 记录起点X坐标
	touchstart: function (e) {
		//开始触摸时 重置所有删除
		this.data.items.forEach(function (v, i) {
			if (v.isTouchMove) //只操作为true的
				v.isTouchMove = false;

		})
		this.setData({
			startX: e.changedTouches[0].clientX,
			startY: e.changedTouches[0].clientY,
			items: this.data.items
		})
	},

	//滑动事件处理
	touchmove: function (e) {
		var that = this,
		index = e.currentTarget.dataset.index, //当前索引
		startX = that.data.startX, //开始X坐标
		startY = that.data.startY, //开始Y坐标
		touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
		touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
		//获取滑动角度
		angle = that.angle({
			X: startX,
			Y: startY
		}, {
			X: touchMoveX,
			Y: touchMoveY
		});

		that.data.items.forEach(function (v, i) {
			v.isTouchMove = false
			//滑动超过30度角 return
			if (Math.abs(angle) > 30) return;
			if (i == index) {
				if (touchMoveX > startX) //右滑
					v.isTouchMove = false
				else //左滑
					v.isTouchMove = true
			}
		})

		//更新数据
		that.setData({
			items: that.data.items
		})

	},

    /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */

	angle: function (start, end) {
		var _X = end.X - start.X;
		var _Y = end.Y - start.Y
		//返回角度 /Math.atan()返回数字的反正切值
		return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	},

	//删除事件
	del: function (e) {
		this.data.items.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			items: this.data.items
		})

	}









})


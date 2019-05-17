//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["简介", "我的专辑"],
		menu_id: 1,
		describe: '',		//简介
		tab_input: '',		//标签input
		tab: '',			//标签
		tabs: [],			//标签集合

		draftsCount: '',    //草稿箱作品数
		items: [],			//专辑列表


		//侧滑删除
		startX: 0, //开始坐标
		startY: 0


	},
	onLoad: function (options) {
		this.handleGetAlbumInfo()
	},
	//收集formId
	formSubmit (e) {
		Utils.getFormId(e); //获取formId	
	},
	//菜单切换
	handleToggleMenu (e) {
		const index = e.currentTarget.dataset.index;
		this.setData({
			menu_id: index
		})
	},
	//跳转到故事列表页
	handleOpenListStory () {
		wx.navigateTo({
			url: '/pages/personal/listStory/listStory',
		})
	},
	//简介
	handleTextarea (e) {
		this.setData({
			describe: e.detail.value
		})
	},
	//监听标签input输入
	handleTabInput (e) {
		let val = e.detail.value;
		this.setData({
			tab_input: val
		})
	},
	//添加标签
	handleAddTabs () {
		let val = this.data.tab_input;
		let tabs = this.data.tabs;
		tabs.push(val);
		this.setData({
			tabs: tabs,
			tab_input: ''
		})
	},
	// 获取专辑
	handleGetAlbumInfo () {
		Require.ajax({
			loading: "1",   //是否开启loading
			url: "api/User/UserAlbum",
			method: 'POST',
			param: {},
			success: res => {
				if (res.code == 200) {
					this.setData({
						draftsCount: res.data.draftsCount
					})
					if (res.data.userAlbum instanceof Array) {
						this.setData({
							items: res.data.userAlbum
						})
						console.log(res.data.userAlbum)
					}
				}
			}
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

	//删除专辑
	handleDeleteAlbum (e) {
		let index = e.currentTarget.dataset.index;
		let title = e.currentTarget.dataset.title;
		if (title == "默认专辑") {
			Utils.showToast('默认专辑不可删除')
			return;
		}
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/User/clearUserAlbum",
			method: 'POST',
			param: {
				id: index
			},
			success: res => {
				if (res.code == 0) {	
					this.handleGetAlbumInfo()			
				}
			}
		})

	}






})



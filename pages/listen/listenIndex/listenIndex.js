//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		imgUrls: [],   //轮播图
		icons: [],     //分类
		indicatorDots: true,
		autoplay: true,
		circular: true,
		interval: 5000,
		duration: 1000,
		list: [],  			//列表
		order_type: 1,       //	1：播放量高到低 2：播放量低到高 3：时间正序 4：时间倒序
	},
	onLoad () {
		this.getListenBanner()	//获取轮播图
		this.getListenScategory()	//获取分类
		this.getListInfo()          //获取列表数据
	},
	onReady: function () { //获得popup组件
		this.filter = this.selectComponent("#filter");
	},
	//获取fromId
	formSubmit (e) {
		Utils.getFormId(e);
	},
	//分享
	onShareAppMessage () {
		return Utils.onShareAppMessage('21', '/pages/personal/history/history', '../../../images/my_section1.png')
	},
	//跳转到搜索页
	hanldOpenSearch () {
		wx.navigateTo({
			url: '/pages/common/search/search',
		})
	},
	//获取轮播图
	getListenBanner() {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/getListenBanner",
			method: 'GET',
			param: {},
			success(res) {
				_this.setData({
					imgUrls: res.data
				})
			}
		})
	},
	//人气榜  精品榜  新品榜
	handleOpenCollectMoney(e) {
		let title = e.target.dataset.title;
		wx.navigateTo({
			url: '/pages/listen/collectMoney/collectMoney?title=' + title + '&footerIndex=' + 0,
		})
	},
	//获取分类
	getListenScategory() {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Scategory/getListenScategory",
			method: 'GET',
			param: {},
			success(res) {
				let icons = res.data
				const pages = [];
				icons.forEach((value, index) => {
					const page = Math.floor(index / 6)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(value)
				})
				_this.setData({
					icons: pages
				})
			}
		})
	},
	// 跳转到分类列表页
	handleOpenClassifyList(e) {
		let title = e.currentTarget.dataset.title;
		wx.navigateTo({
			url: '/pages/listen/classifyList/classifyList?footerIndex=' + 0 + '&title=' + title,
		})
	},
	
	
	
	
	
	//获取列表数据
	getListInfo () {
		const _this = this;
		Require.ajax({
			loading: "1",   //是否开启loading
			url: "api/Salbum/listenPageStory",
			method: 'POST',
			param: {
				order_type: this.data.order_type
			},
			success: function (res) { 
				console.log(res)
				_this.setData({
					list: res.data
				})
			}
		})
	},
	//切换最新播放量
	handleToggleOrderType (e) {
		let type = this.data.order_type;
		let index = e.currentTarget.dataset.index;
		switch (index) {
			case '1': this.setData({ order_type: type == 1 ? 2 : 1});break;
			case '1': this.setData({ order_type: type == 2 ? 1 : 1 }); break;
			case '3': this.setData({ order_type: type == 3 ? 4 : 3 }); break;
			case '3': this.setData({ order_type: type == 4 ? 3 : 3 }); break;
		}
		this.getListInfo()	  //获取列表数据
	},
	//跳转到播放页
	handleOpenDetails (e) {
		let index = e.currentTarget.dataset.index;
		wx.navigateTo({
			url: '/pages/listen/details/details?id=' + index + '&footerIndex=' + '0'
		})
	},

	//弹出筛选
	handleOpenFilter() {
		this.filter.showModal();
	},
	//接收筛选信息
	getFilterInfo (e) {
		console.log(e.detail)
	}
	
	
})
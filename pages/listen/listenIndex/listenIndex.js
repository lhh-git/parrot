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
		order_type: 1,       //	1：倒序 2：正序
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


	handleOpenCollectMoney () {
		wx.navigateTo({
			url: '/pages/listen/collectMoney/collectMoney',
		})
	},
	//获取轮播图
	getListenBanner () {
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
	//获取分类
	getListenScategory () {
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
	//弹出筛选
	handleOpenFilter () {
		this.filter.showModal();
	},
	//获取列表数据
	getListInfo () {
		const _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Salbum/listenIDSort",
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
	}
	
	
})
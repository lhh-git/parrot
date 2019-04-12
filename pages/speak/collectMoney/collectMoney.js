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
		duration: 1000
	},
	onLoad() {
		this.getListenBanner()	//获取轮播图
		this.getListenScategory()	//获取分类
	},
	handleOpenCollectMoney() {
		wx.navigateTo({
			url: '/pages/listen/collectMoney/collectMoney',
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
				}, () => {
					console.log(_this.data.icons)
				})
			}
		})
	},
	//
	handleOpenWorksPlay() {
		wx.navigateTo({
			url: '/pages/speak/worksPlay/worksPlay'
		})
	}

})
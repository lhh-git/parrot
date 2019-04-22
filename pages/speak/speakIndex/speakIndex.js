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
		this.getTellingBanner()	//获取轮播图
		this.getTellingScategory()	//获取分类
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	handleOpenCollectMoney() {
		wx.navigateTo({
			url: '/pages/speak/collectMoney/collectMoney',
		})
	},
	//获取轮播图
	getTellingBanner() {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/getTellingBanner",
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
	getTellingScategory() {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Scategory/getTellingScategory",
			method: 'GET',
			param: {},
			success(res) {
				let icons = res.data
				const pages = [];
				icons.forEach((value, index) => {
					const page = Math.floor(index / 6)
					console.log(page)
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
	//阅读
	openSpeakDetail () {
		wx.navigateTo({
			url: '/pages/speak/speakDetail/speakDetail',
		})
	}

})
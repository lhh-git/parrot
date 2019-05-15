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
		list: [],			//列表页
		order_type: 1,		//1：播放量高 2：播放量低 3：时间正序 4：时间倒序
	},
	onLoad() {
		this.getTellingBanner()	//获取轮播图
		this.getTellingScategory()	//获取分类
		this.handleGetListInfo()	//获取列表数据
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	//搜索
	hanldOpenSearch () {
		wx.navigateTo({
			url: '/pages/common/search/search?url=' +'讲故事',
		})
	},
	//人气榜  精品榜  新品榜
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
	// 列表数据
	handleGetListInfo () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/tellingPageStory",
			method: 'POST',
			param: {
				order_type: 1
			},
			success(res) {
				console.log(res.data)
				_this.setData({
					list: res.data
				})
			}
		})
	},
	//阅读
	openSpeakDetail (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/speak/speakDetail/speakDetail?id=' + id,
		})
	}

})
//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		url: '',		//听故事/讲故事
		search_val: '',

		history: [], 	//搜索历史
		list: [],		//搜索列表
	},
	onLoad: function (options) {
		this.setData({
			url: options.url
		})
		this.handleGetSearchHistory();
	},
	//收集formId
	formSubmit (e) {
		Utils.getFormId(e); //获取formId	
	},
	//搜索框变化
	handleGetInputVal (e) {
		let search_val = e.detail.value;
		if (search_val == '') {
			this.handleGetSearchHistory()
		}
		this.setData({
			search_val: search_val
		}, () => {
			this.handleGetSearchList()
		})
	},
	//获取搜索列表
	handleGetSearchList () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/searchList",
			method: 'POST',
			param: {
				title: this.data.search_val
			},
			success: function (res) {
				console.log(res)
				if (res.code == 200 && res.data instanceof Array) {
					_this.setData({
						list: res.data
					})
				} else {
					_this.setData({
						list: []
					})
				}
			}
		})
	},
	//跳转到对应模块
	handleOpenUrl () {
		let url = this.data.url;
		if (url == '听故事') {
			wx.navigateTo({
				url: '/pages/listen/listStory/listStory',
			})
			return;
		}
		if (url == '讲故事') {
			wx.navigateTo({
				url: '/pages/listen/listStory/listStory',
			})
			return;
		}
	},
	// 搜索记录
	handleGetSearchHistory () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/searchHistory",
			method: 'POST',
			param: {},
			success: function (res) {
				if (res.code == 200 && res.data instanceof Array) {
					_this.setData({
						history: res.data
					})
				} else {
					_this.setData({
						history: []
					})
				}
			}
		})
	},
	// 清空搜索记录
	handleClearHistotySearch () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/clearSearchHistory",
			method: 'POST',
			param: {},
			success: function (res) {
				console.log(res)
				if (res.code == 0) {
					_this.handleGetSearchHistory()
				} else {
					Utils.showToast(res.msg, 'err')
				}
			}
		})
	},


	
	








})


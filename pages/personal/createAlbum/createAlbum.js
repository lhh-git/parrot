//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		photo: '',   		//封面
		title: '',	 		//标题
		classify: '',		//分类
		classify_sel: '',	//选中分类
		tabs: [],			//标签
		tab: '',			//标签input
		is: false,			//是否公开
		describe: '',		//简介
	},
	onLoad: function (options) {
		this.handleGetClassifyInfo()  //获取分类数据
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//从本地获取封面
	handleGetPhoto () {
		let _this = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				const tempFilePaths = res.tempFilePaths;
				_this.setData({
					photo: tempFilePaths
				})
			}
		})
	},
	//获取分类数据
	handleGetClassifyInfo ( ) {
		let _this = this;
		let arr = [];
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/getCreateScategory",
			method: 'GET',
			param: {},
			success(res) {
				res.data.forEach((item, index) => {
					arr.push(item.scategory_name);
				})
				_this.setData({
					classify: arr
				})
			}
		})
	},
	//获取分类
	handleGetClassify () {
		let _this = this;
		wx.showActionSheet({
			itemList: this.data.classify,
			success(res) {
				_this.setData({
					classify_sel: _this.data.classify[res.tapIndex]
				})
			}
		})	
	},
	//监听标题input框数据改变
	handleChangeTitle (e) {
		let val = e.detail.value;
		if (val.length > 14) {
			Utils.showToast('最大长度为14', 'err');
			this.setData({
				title: val
			})
		}
	},
	//监听标签input框数据改变
	handleChangeTabs (e) {
		let val = e.detail.value;
		this.setData({
			tab: val
		})
	},
	//添加标签
	handleCreateTabs () {
		let tabs = this.data.tabs;
		if (this.data.tab.length > 6) {
			Utils.showToast('最大长度为6', 'err');
			return;
		}
		if (this.data.tabs.length >= 10) {
			Utils.showToast('最多可添加10个', 'err');
			return;
		}
		tabs.push(this.data.tab);
		this.setData({
			tab: '',
			tabs: tabs
		}, () => {
			console.log(this.data.tabs)
		})
		
	}
	



})



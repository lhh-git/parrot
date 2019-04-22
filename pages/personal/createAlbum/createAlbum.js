//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		photo: '',   		//封面
		title: '',	 		//标题
		classify_arr: [],   //分类数据
		classify: '',		//渲染分类数据
		classify_sel: '',	//选中分类
		classify_selid: '', //选择分类id
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
				// this.handleChoosImage(tempFilePaths);
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
					classify_arr: res.data,
					classify: arr,
					classify_selid: res.data[0].id
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
				let classify = _this.data.classify_arr;
				let classify_sel = _this.data.classify[res.tapIndex];
				classify.forEach((val, index) => {
					if (val.scategory_name == classify_sel) {
						_this.setData({
							classify_sel: classify_sel,
							classify_selid: val.id
						})

					}
				})
			}
		})	
	},
	//监听标题input框数据改变
	handleChangeTitle (e) {
		let val = e.detail.value;
		if (val.length > 14) {
			Utils.showToast('最大长度为14', 'err');
		}
		this.setData({
			title: val
		})
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
		if (this.data.tab == '') {
			Utils.showToast('内容不能为空', 'err');
			return;
		}
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
		})
		
	},
	//是否公开
	handleSwitch (e) {
		this.setData({
			is: e.detail.value
		})
	},
	//简介
	handleTextareaChange (e) {
		this.setData({
			describe: e.detail.value
		})
	},
	//创建
	handleAlbumCreate () {
		if (this.data.photo == '') {
			Utils.showToast("封面不能为空", "err");
			return;
		}
		if (this.data.title == '') {
			Utils.showToast("标题不能为空", "err");
			return;
		}
		if (this.data.title.length > 14) {
			Utils.showToast("标题格式错误", "err");
			return;
		}
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: 'api/Tellingstory/createUserAlbum',
			method: 'POST',
			param: {
				file: this.data.photo,
				arrayStoryLabel: this.data.tabs,
				user_album_title: this.data.title,
				user_album_authority: this.data.is == true ? 0 : 1,
				user_album_describe: this.data.describe,
				scategory_id: this.data.classify_selid
			},
			success: function (res) {
				console.log(res)
			}
		})
		
	},
	
	
	
	



})



//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["简介", "ta的声音"],
		menu_id: 0,
		
		tabs: [121212,33333,33333,3333],			//标签集合

	},
	onLoad: function (options) {
		
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
	//打开故事列表页
	handleOpenListStory () {
		wx.navigateTo({
			url: '/pages/listen/listStory/listStory'
		})
	}











})



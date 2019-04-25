//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		show: false,   //简介
	},
	onLoad: function (options) {

	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	//点击展示简介
	handleSunopsisShow () {
		let show = !this.data.show;
		this.setData({
			show: show
		})
	}


})


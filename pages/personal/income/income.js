//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["奖金余额", "佣金余额", "鹦鹉蛋余额"],
		menu_id: 1,
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
	}







})



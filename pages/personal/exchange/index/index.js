//获取应用实例
const APP = getApp()
import Utils from '../../../../utils/util.js'
import Require from '../../../../utils/require.js'

Page({
	data: {
		menu: ["兑换", "提现"],
		menu_id: 0,
		classify: ["exchange_bonus.png", "exchange_commission.png", "exchange_egg.png"],
		classify_id: 0,
	},
	onLoad: function (options) {

	},
	//收集formId
	formSubmit (e) {
		Utils.getFormId(e); //获取formId	
	},
	//菜单切换
	handleToggleMenu(e) {
		const index = e.currentTarget.dataset.index;
		this.setData({
			menu_id: index
		})
	},
	//分类切换
	handleToggleClassify (e) {
		const index = e.currentTarget.dataset.index;
		this.setData({
			classify_id: index
		})
	},
	







})


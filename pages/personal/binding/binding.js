//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["binding_wechat.png", "binding_play.png", "binding_code.png"],
		menu_id: 0,
		weChat_url: '',
		play_url: ''
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
	// 从本地获取图片
	handleGetImages (e) {
		const _this = this;
		const index = e.currentTarget.dataset.index;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				_this.setData({
					weChat_url: index == 0 ? tempFilePaths : _this.data.weChat_url,
					play_url: index == 1 ? tempFilePaths : _this.data.play_url
				})
			}
		})
	}








})



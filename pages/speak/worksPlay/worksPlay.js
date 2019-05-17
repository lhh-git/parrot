//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
	data: {
		time: 0,            //录制时长

		id: '4',			//故事id
		story: {}, 		//故事信息
		three: [],		//优秀读者前三
		excellent: [],	//优秀读者不含三
	},
	onLoad: function (options) {
		this.handleExcellentReaders()			//优秀读者

	},
	onReady: function () { //获得popup组件
		this.canvas = this.selectComponent("#canvas");
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	// 转发
	onShareAppMessage() {

	},
	//优秀读者
	handleExcellentReaders() {
		let _this = this;
		Require.ajax({
			loading: "1",   //是否开启loading
			url: "api/Tellingstory/excellentReaders",
			method: 'POST',
			param: {
				id: this.data.id
			},
			success(res) {
				if (res.code === 200 && res.data instanceof Array) {
					let list = res.data;
					list.forEach((value, index) => {
						if (index <= 2) {
							let arr = _this.data.three;
							arr.push(value);
							_this.setData({
								three: arr
							})
						} else {
							let arr = _this.data.excellent;
							arr.push(value);
							_this.setData({
								excellent: arr
							})
						}
					})
				}	
			}
		})
	},



	// 生成海报
	handleCreateCanvas () {
		this.canvas.handleGetCanvalInfo()
	},
	




})
//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		id: '',			//故事id
		story: {}, 		//故事信息
		three: [],		//优秀读者前三
		excellent: [],	//优秀读者不含三
	},
	onLoad (options) {
		this.setData({
			id: options.id
		})
		this.handleGetTellingStoryContent()   //根据上页故事id获取内容
		this.handleExcellentReaders()			//优秀读者
	},
	//点击朗读
	handleOpenRecord () {
		wx.navigateTo({
			url: '/pages/speak/record/record?id=' + this.data.id,
		})
	},
	//根据上页故事id获取内容
	handleGetTellingStoryContent () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/getTellingStoryContent",
			method: 'POST',
			param: {
				id: this.data.id
			},
			success(res) {
				_this.setData({
					story: res.data
				})
			}
		})
	},
	//优秀读者
	handleExcellentReaders () {
		let _this = this;
		Require.ajax({
			loading: "1",   //是否开启loading
			url: "api/Tellingstory/excellentReaders",
			method: 'POST',
			param: {
				id: this.data.id
			},
			success(res) {
				let list = res.data;
				list.forEach((value, index) => {
					if (index <= 2) {
						let arr = _this.data.three;
						arr.push(value);
						_this.setData({
							three: arr
						}, () => {
							console.log(_this.data.three)
						})
					}else {
						let arr = _this.data.excellent;
						arr.push(value);
						_this.setData({
							excellent: arr
						})
					}	
				})
			}
		})
	}

})


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
        imgPath:""
	},
	onLoad (options) {
		this.setData({
			id: options.id,
            imgPath: APP.globalData.imgPath
		})
		this.handleGetTellingStoryContent()   //根据上页故事id获取内容
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
            url: "Speak/getStoryDetails",
            method: 'GET',
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
    handleUrl(e) {
        const id = e.currentTarget.dataset.id
        if (!id) {
            return;
        } 
        wx.navigateTo({
            url: "/pages/listen/popularity/popularity?id=" + id +"&footerIndex=1"
        })
    }
})


//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
	data: {
		storyId: '',		//故事id
		dbId: '',			//背景音乐id
		url: '',			//录音路径
		name: '',           //标题
	},
	onLoad: function (options) {
		console.log(options)
		this.setData({
			storyId: options.storyId,		
			dbId: options.dbId,			
			url: options.url
		})
		this.handleGetStoryInfo()	//获取故事信息
	},
	//获取故事信息
	handleGetStoryInfo () {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
			url: "api/Tellingstory/showUploadWorks",
			method: 'POST',
			param: {
				id: this.data.storyId
			},
			success(res) {
				_this.setData({
					name: res.data.telling_story_name
				})
			}
		})
	}
	


})
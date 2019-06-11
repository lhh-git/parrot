//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'
var app = getApp();  
Page({
	data: {
		footerIndex: '',	//底部菜单下标
        story:"",
        imgPath: "",
	},
	onLoad: function (options) {
		console.log(options)
        this.handleGetTellingStoryContent(options.title)
		wx.setNavigationBarTitle({
			title: options.title
		})
		this.setData({
			footerIndex: options.footerIndex,
            imgPath: app.globalData.imgPath
		})
	},
	//打开听故事详情页
	handleOpenDetails (e) {
		wx.navigateTo({
            url: '/pages/listen/details/details?id=' + e.currentTarget.dataset.id,
		})
	},
    //根据上页故事id获取内容
    handleGetTellingStoryContent(title) {
        let path
        if (title=="精品榜"){
            path = "Index/getGoodTop"
        }else if (title=="新品榜") {
            path="Index/getNewTop"
        }else{
            path = "Index/getHotTop"
        }
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: path,
            method: 'GET',
            param: {},
            success:res=> {
               if(res.code==200){
                    this.setData({
                        story: res.data
                    })
               }
            }
        })
    },
})
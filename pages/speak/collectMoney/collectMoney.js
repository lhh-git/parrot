//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
        list:[],
        title:"",
        imgPath:'',
	},
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: options.title
        })
        this.setData({
            title: options.title,
            imgPath: APP.globalData.imgPath
        },()=>{
            this.handleList()
        })
	},
	// handleOpenCollectMoney() {
	// 	wx.navigateTo({
	// 		url: '/pages/listen/collectMoney/collectMoney',
	// 	})
	// },
	handleList() {
        let path
		if (this.data.title=="周榜") {
            path = 'Speak/getWeekTopList'
        } else if (this.data.title == "总榜"){
            path = 'Speak/getAllTopList'
        }else{
            path = 'Speak/getMonthTopList'
        }
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: path,
			method: 'GET',
			param: {},
			success:res=> {
                if(res.code==200){
                    this.setData({
                        list: res.data
                    })
                }
			}
		})
	},
	handleOpenWorksPlay(e) {
		wx.navigateTo({
            url: '/pages/speak/worksPlay/worksPlay?id=' + e.currentTarget.dataset.id
		})
	}

})
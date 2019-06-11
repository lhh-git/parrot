//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["简介", "ta的声音"],
		menu_id: 0,
        desc:"",                                    //数据
		tabs: [121212,33333,33333,3333],			//标签集合
        id:"",
        imgPath:"",
        footerIndex:"",
	},
	onLoad: function (options) {
        this.handleDetail(options.id)
        this.setData({
            footerIndex: options.footerIndex,
            id: options.id,
            imgPath: APP.globalData.imgPath
        })
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
	//打开故事列表页
	handleOpenListStory (e) {
		wx.navigateTo({
			url: '/pages/listen/listStory/listStory?id='+e.currentTarget.dataset.id+'&title=听故事'
		})
	},
    // 
    handleDetail(id) {
        console.log(id)
        const userid = wx.getStorageSync("id")
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/getUserHomePage",
            method: 'GET',
            param: {
                authorID: id,
                userID: userid,
            },
            success: res => {
                if (res.code == 200) {
                   this.setData({
                       desc: res.data
                   })
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },
    // 收藏作者
    handleAuthor() {
        const userid = wx.getStorageSync("id")
        const authorID = this.data.desc.id
        console.log(authorID)
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/collectAuthor",
            method: 'POST',
            param: {
                authorID: authorID,
                userID: userid,
            },
            success: res => {
                if (res.code == 200) {
                    Utils.showToast(res.msg, "success")
                    this.handleDetail(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },
    // 收藏专辑
    handleAlbum(e) {
        const userid = wx.getStorageSync("id")
        const albumID = e.currentTarget.dataset.id
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/collectAlbum",
            method: 'POST',
            param: {
                albumID: albumID,
                userID: userid,
            },
            success: res => {
                if (res.code == 200) {
                    Utils.showToast(res.msg, "success")
                    this.handleDetail(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },


})



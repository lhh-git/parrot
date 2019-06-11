//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
        list:"", //数据
        id:"",    //数据id
        imgPath:"",//图片路径补全
        title:""
	},
	onLoad: function (options) {
        this.setData({
            id: options.id,
            imgPath: APP.globalData.imgPath,
            title: options.title
        },()=>{
            this.handleGetListInfo(options.id)
        })
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//跳转到播放页
	handleOpenDetails (e) {
        console.log(e)
        const stu = e.currentTarget.dataset.stu
        console.log(stu)
        if(stu==1){
            wx.navigateTo({
                url: '/pages/listen/details/details?footerIndex=' + '0'+'&id='+e.currentTarget.dataset.id
            })
        }else{
            wx.navigateTo({
                url: '/pages/speak/worksPlay/worksPlay?footerIndex=' + '0' + '&id=' + e.currentTarget.dataset.id
            })
        }
	},
    // 数据
    handleGetListInfo(id) {
        let path
        if (this.data.title == '听故事') {
            path = "Index/getAlbumStoryList"
        }else {
            path = "Speak/getAlbumUserStoryList"
        }
        const userId = wx.getStorageSync("id")
        Require.ajax({
            loading: "1",   //是否开启loading
            url: path,
            method: 'GET',
            param: {
                albumID: id,
                userID: userId,
            },
            success: res => {
                if(res.code==200) {
                    this.setData({
                        list: res.data
                    })
                }
            }
        })
    }, 
    // 收藏故事
    handleCollect(e) {
        const userid = wx.getStorageSync("id")
        const storyID = e.currentTarget.dataset.id;
        Require.ajax({
            // loading: "1",   //是否开启loading
            url: "Index/collectStory",
            method: 'POST',
            param: {
                storyID: storyID,
                userID: userid
            },
            success: res => {
                if (res.code == 200) {
                    // Utils.showToast(res.msg, "success")
                    this.handleGetListInfo(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    },
    handleCollect1(e) {
        const userid = wx.getStorageSync("id")
        const storyID = e.currentTarget.dataset.id;
        Require.ajax({
            // loading: "1",   //是否开启loading
            url: "Speak/collectUserStory",
            method: 'POST',
            param: {
                userStoryID: storyID,
                userID: userid
            },
            success: res => {
                if (res.code == 200) {
                    // Utils.showToast(res.msg, "success")
                    this.handleGetListInfo(this.data.id)
                } else {
                    Utils.showToast(res.msg, "err")
                }
            }
        })
    }
})



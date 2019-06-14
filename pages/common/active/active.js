//获取应用实例
const app = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
    data: {
        imgPath:"",
        data:"",
        height:"",
        width: "",
    },
    onLoad(options) {
        
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
            width: wx.getSystemInfoSync().windowWidth,
            imgPath: app.globalData.imgPath,
        },()=>{
            Require.ajax({
                // loading: "1",   //是否开启loading
                url: "Index/getBannerDetails",
                method: 'GET',
                param: {
                    id: options.id
                },
                success: res => {
                    console.log(res)
                    this.setData({
                        data: res.data
                    })
                }
            })
        })
    },
    handleUrl(){
        wx.navigateTo({
            url: this.data.data.btn_link,
        })
    },
    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
})
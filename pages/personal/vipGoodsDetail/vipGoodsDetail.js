//获取应用实例
const APP = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
        detail:"",
		imgUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		circular: true,
        imgPath:""
	},
	onLoad: function (options) {
        this.getListDetail(options.id)
        this.setData({
            imgPath: APP.globalData.imgPath
        })
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//打开商品信息
	handleOpenVipOrderInfo (e) {
        const id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '/pages/personal/vipOrderInfo/vipOrderInfo?id='+id,
		})
	},
    getListDetail(id) {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "User/getProductDetails",
            method: 'GET',
            param: {
                productID:id
            },
            success: res => {
                console.log(res)
                if (res.code === 200) {
                    WxParse.wxParse('article', 'html', res.data.content, this, 5);
                    this.setData({
                        detail: res.data,
                        imgUrls: res.data.imgs
                    })
                }
            }
        })
    }
})



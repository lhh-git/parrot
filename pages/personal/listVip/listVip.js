//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
        list: [],
        imgPath:"",
	},
	onLoad: function (options) {
        this.getListVip()
        this.setData({
            imgPath: APP.globalData.imgPath
        })
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//打开商品详情页
	handleOpenVipGoodsDetail (e) {
        const id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '/pages/personal/vipGoodsDetail/vipGoodsDetail?id='+id
		})
	},
    getListVip () {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "User/getVipImgs",
            method: 'GET',
            param: {},
            success: res=> {
                if (res.code===200) {
                    this.setData({
                        list: res.data
                    })
                }
            }
        })
    }
})
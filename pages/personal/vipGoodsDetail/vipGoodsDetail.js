//获取应用实例
const APP = getApp()
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
	},
	onLoad: function (options) {
        this.getListDetail(options.id)
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
            url: "api/Vip/getProductDetail",
            method: 'POST',
            param: {
                id:id
            },
            success: res => {
                console.log(res)
                if (res.code === 200) {
                    this.setData({
                        detail: res.data,
                        imgUrls: res.data.ProductImg
                    })
                }
            }
        })
    }
})



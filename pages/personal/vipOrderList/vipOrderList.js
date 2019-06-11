//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		
	},
	onLoad: function (options) {
        this.handleOrderList(options.id)
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//打开订单详情
	handleOpenVipOrderDetail () {
		wx.navigateTo({
			url: '/pages/personal/vipOrderDetail/vipOrderDetail',
		})
	},
    handleOrderList(id) {
        let _this = this;
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "api/Vip/myOrder",
            method: 'POST',
            param: {
            },
            success(res) {
                console.log(res.data)
                _this.setData({
                    story: res.data
                })
            }
        })
    }









})



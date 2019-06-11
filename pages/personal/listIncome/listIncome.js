//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["奖金", "佣金", "鹦鹉蛋"],
		menu_id: 0,
	},
	onLoad: function (options) {
        this.handleOrderDetail()
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
	//跳转收入详情
	handleOpenDetailsIncome (e) {
		wx.navigateTo({
			url: '/pages/personal/detailsIncome/detailsIncome',
		})
	},
    handleOrderDetail() {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "user_money_type",
            method: 'POST',
            param: {
                user_money_type: this.data.menu_id
            },
            success: res => {
                this.setData({
                    story: res.data
                })
            }
        })
    }

})



//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
        memberCard:"",  //赠品后台数据
        detail:"",      // 购买商品详情
        district:"",    //小区
        add:"",         //详细地址
        name: "",       //收货人姓名
        leaving:"",     //留言
        phone:"",       //手机号
        city:"",        //城市
        imgPath:"",     //图片路径
	},
	onLoad(options) {
        this.getOrderInfo(options.id)
        this.setData({
            imgPath: APP.globalData.imgPath
        })
	},
    onShow(options){
        console.log(options)
    },
	onReady: function () { //获得popup组件
		this.picker = this.selectComponent("#picker");
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	//获取三级联动
	handleGetPicker () {
		this.picker.showModal()
	},
    // input表单输入
    handleInput (e) {
        const key = e.currentTarget.dataset.title;
        const val = e.detail.value;
        this.setData({
            [key]:val
        })
    },
    // 页面首次渲染
    getOrderInfo(id) {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "User/getProductDetails",
            method: 'GET',
            param: {
                productID: id
            },
            success: res => {
                console.log(res)
                if (res.code === 200) {
                    this.setData({
                        detail: res.data,
                    })
                }
            }
        })
    },
    // 立即购买
    handleVipOrderInfo() {
        const path = this.data
        // if (!path.city) {
        //     Utils.showToast("城市不能为空")
        //     return false;
        // }
        // if (!path.district){
        //     Utils.showToast("街道/小区不能为空")
        //     return false;
        // }
        // if (!path.add) {
        //     Utils.showToast("详细地址不能为空")
        //     return false;
        // }
        // if (!path.name) {
        //     Utils.showToast("收货人姓名不能为空")
        //     return false;
        // }
        // if (!path.phone) {
        //     Utils.showToast("联系方式不能为空")
        //     return false;
        // }
        // if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(path.phone)) {
        //     Utils.showToast("输入正确的手机号")
        //     return false;
        // }
        const openid = wx.getStorageSync("openid")
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "User/unifiedorder",
            method: 'POST',
            param: {
                userID:"",
                provID: "",
                cityID:"",
                areaID:"",
                street: this.data.district,
                buildNumber: this.data.add,
                reName: this.data.name,
                telPhone: this.data.phone,
                txamt: "1",          //订单金额
                sub_openid: openid,                     //openid
                goods_name: this.data.detail.name,      //商品名称
            },
            success: res => {
                // 订单详情
                // wx.navigateTo({
                //     url: '/pages/personal/vipOrderDetail/vipOrderDetail',
                // })
                const data = res.data.pay_params
                if (res.code == 200) {
                    wx.requestPayment({
                        timeStamp:data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: 'MD5',
                        paySign: res.signWx,
                        success(res) { 
                            console.log(res)
                        },
                        fail(res) {
                            console.log(res)
                         }
                    })
                    Utils.showToast(res.msg)
                }else{
                    Utils.showToast(res.msg)
                }
            }
        })
    }
})







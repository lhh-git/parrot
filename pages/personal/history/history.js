
//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
    data: {
        menu: ["专辑","音频"],
        menu_id: 0,
        classify: ["exchange_bonus.png", "exchange_commission.png", "exchange_egg.png"],
        classify_id: 0,
        detail: "",
        //侧滑删除
        // items:[],
        imgPath: "",
        startX: 0, //开始坐标
        startY: 0,
        page:1
    },
    onLoad: function (options) {
        this.getOrderInfo()
        // for (var i = 0; i < 10; i++) {
        // 	this.data.items.push({
        // 		content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
        // 		isTouchMove: false //默认隐藏删除
        // 	})
        // }
        this.setData({
            // items: this.data.items,
            imgPath: APP.globalData.imgPath
        });
    },
    //收集formId
    formSubmit(e) {
        Utils.getFormId(e); //获取formId	
    },
    //菜单切换
    handleToggleMenu(e) {
        const index = e.currentTarget.dataset.index;
        if (this.data.menu_id == index) {
            return;
        }
       
        this.setData({
            detail: [],
            menu_id: index,
            page : 1
        }, () => {
            this.getOrderInfo()
        })
    },
    
       
    
    //跳转统一处理
    handlePath(e) {
        const url = e.currentTarget.dataset.url
        console.log(url)
        wx.navigateTo({
            url: url
        })
    },


    //手指触摸动作开始 记录起点X坐标
    touchstart: function (e) {
        //开始触摸时 重置所有删除
        this.data.detail.forEach(function (v, i) {
            if (v.isTouchMove) //只操作为true的
                v.isTouchMove = false;
        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            detail: this.data.detail
        })
    },

    //滑动事件处理
    touchmove: function (e) {
        var that = this,
            index = e.currentTarget.dataset.index, //当前索引
            startX = that.data.startX, //开始X坐标
            startY = that.data.startY, //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
            //获取滑动角度
            angle = that.angle({
                X: startX,
                Y: startY
            }, {
                    X: touchMoveX,
                    Y: touchMoveY
                });

        that.data.detail.forEach(function (v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true
            }
        })

        //更新数据
        that.setData({
            detail: that.data.detail
        })

    },

    /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */

    angle: function (start, end) {
        var _X = end.X - start.X;
        var _Y = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },

    //删除事件
    del: function (e) {
        this.data.items.splice(e.currentTarget.dataset.index, 1)
        this.setData({
            items: this.data.items
        })

    },
    // 首次渲染
    getOrderInfo() {
        const userId = wx.getStorageSync("id")
        let index = this.data.menu_id
        Require.ajax({
            // loading: "1",   //是否开启loading
            url: "User/myViewRecords",
            method: 'GET',
            param: {
                id: userId,
                type: (index == 0 ? 2 : index == 1 ? 1 : index == 2 ? 1 : 3),
                page:this.data.page
            },
            success: res => {
                if (res.data == "") {
                    this.setData({
                        page: this.data.page - 1
                    })
                    Utils.showToast("没有更多数据")
                    return;
                }
                let arr = res.data
                for (let i = 0; i < arr.length; i++) {
                    arr[i]["isTouchMove"] = false
                }
                if (res.code === 200) {
                    this.setData({
                        detail: [...this.data.detail,...arr],
                    })
                }
            }
        })
    },

    //上拉加载
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        }, () => {
            this.getOrderInfo()
        })
    },
    // 删除
    getOrderDetele(e) {
        console.log(e.currentTarget.dataset.id)
        Require.ajax({
            // loading: "1",   //是否开启loading
            url: "User/delViewRecord",
            method: 'POST',
            param: {
                id: e.currentTarget.dataset.id,
            },
            success: res => {
                if (res.code === 200) {
                    let arr = this.data.detail
                    Utils.showToast("删除成功", "success")
                    if (arr.length > 9) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].id == e.currentTarget.dataset.id){
                                arr.splice(i,1)
                            }
                        }
                        this.setData({
                            detail: arr,
                        })
                    } else {
                        this.setData({
                            page: 1,
                            detail: []
                        }, () => {
                            this.getOrderInfo()
                        })
                    }
                }
            }
        })
    }
})


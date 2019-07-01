//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
	data: {
		footerIndex: '',	//底部菜单下标
        list:"",
        order_type:1,
        imgPath: "",
        id:"",
        page: 1
	},
	onLoad: function (options) {
        this.getListInfo(options.id)
		wx.setNavigationBarTitle({
			title: options.title
		})
		this.setData({
			footerIndex: options.footerIndex,
            id: options.id,
            imgPath: APP.globalData.imgPath
		})
	},
	//打开讲故事详情页
	handleOpenDetails(e) {
		wx.navigateTo({
            url: '/pages/speak/speakDetail/speakDetail?footerIndex=' + '0'+'&id='+e.currentTarget.dataset.id,
		})
	},
    //分享
    onShareAppMessage() {
        return Utils.onShareAppMessage()
    },
    //获取列表数据
    getListInfo(id) {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "Index/getStoryList",
            method: 'GET',
            param: {
                order: this.data.order_type,
                typeID:id,
                moduleType:2,
                page : this.data.page
            },
            success: res => {
                if (res.data == "") {
                    this.setData({
                        page: this.data.page - 1
                    })
                    Utils.showToast("没有更多数据")
                    return;
                }
               if (res.code == 200 ) {
                    this.setData({
                        list: [...this.data.list,...res.data]
                    })
                }
            }
        })
    },
    //上拉加载
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        })
        this.getListInfo(this.data.id)
    },
    //切换最新播放量
    handleToggleOrderType(e) {
        let type = this.data.order_type;
        let index = e.currentTarget.dataset.index;
        switch (index) {
            case '1': this.setData({ order_type: type == 1 ? 2 : 1 }); break;
            case '1': this.setData({ order_type: type == 2 ? 1 : 1 }); break;
            case '3': this.setData({ order_type: type == 3 ? 4 : 3 }); break;
            case '3': this.setData({ order_type: type == 4 ? 3 : 3 }); break;
        }
        this.getListInfo(this.data.id)	  //获取列表数据
    },

})
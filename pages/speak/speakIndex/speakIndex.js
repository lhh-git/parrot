//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

 

Page({
	data: {
		imgUrls: [],   //轮播图
		icons: [],     //分类
		indicatorDots: true,
		autoplay: true,
		circular: true,
		interval: 5000,
		duration: 1000,
		list: [],			//列表页
		order_type: 1,		//1：播放量高 2：播放量低 3：时间正序 4：时间倒序
        imgPath: "",
        page: 1
	},
	onLoad() {
		// this.getTellingBanner()	//获取轮播图
		// this.getTellingScategory()	//获取分类
		this.handleGetListInfo()	//获取列表数据
        this.setData({
            imgPath: APP.globalData.imgPath
        })
	},
    handleBannerPath(e) {
        const id = e.currentTarget.dataset.id
        const link = e.currentTarget.dataset.link
        const link1 = e.currentTarget.dataset.link1
        if (link==1) {
            wx.navigateTo({
                url: link1,
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/common/active/active?id=' + id,
        })
    },
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	//搜索
	hanldOpenSearch () {
		wx.navigateTo({
			url: '/pages/common/search/search?url=' +'讲故事',
		})
	},
	//人气榜  精品榜  新品榜
	handleOpenCollectMoney(e) {
		wx.navigateTo({
			url: '/pages/speak/collectMoney/collectMoney?title='+e.currentTarget.dataset.title,
		})
	},
    onShow() {
        this.getTellingBanner()	//获取轮播图
        this.getTellingScategory()	//获取分类
        // this.handleGetListInfo()	//获取列表数据
    },
    // 故事分类
    handleUrl(e) {
        console.log(e)
        let title = e.currentTarget.dataset.title;
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/speak/classifyList/classifyList?footerIndex=' + 1 + '&title=' + title + '&id=' + id,
        })
    },
	//获取轮播图
	getTellingBanner() {
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/getBanner",
			method: 'GET',
			param: {
                type:2
            },
			success:res=> {
                console.log(res)
				this.setData({
					imgUrls: res.data
				})
			}
		})
	},
	//获取分类
	getTellingScategory() {
		let _this = this;
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/getStoryType",
			method: 'GET',
            param: {
                type: 2
            },
			success(res) {
				let icons = res.data
				const pages = [];
				icons.forEach((value, index) => {
					const page = Math.floor(index / 3)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(value)
				})
				_this.setData({
					icons: pages
				})
			}
		})
	},
	// 列表数据
	handleGetListInfo () {
		Require.ajax({
			loading: "1",   //是否开启loading
            url: "Index/getStoryList",
            method: 'GET',
			param: {
                order: this.data.order_type,
                moduleType:2,
                page:this.data.page
			},
			success:res=> {
                if (res.data == "") {
                    this.setData({
                        page: this.data.page - 1
                    })
                    Utils.showToast("没有更多数据")
                    return;
                }
				if(res.code == 200 ) {
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
        this.handleGetListInfo()
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
		this.handleGetListInfo()	  //获取列表数据
	},
	//阅读
	openSpeakDetail (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/speak/speakDetail/speakDetail?id=' + id,
		})
	}

})
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
		list: [],  			//列表
		order_type: 1,       //	1：播放量高到低 2：播放量低到高 3：时间正序 4：时间倒序
        imgPath:"",
        audioPath:"",
        page:1
	},
	onLoad () {
		// this.getListenBanner()	//获取轮播图
		// this.getListenScategory()	//获取分类
        this.getListInfo1()          //获取列表数据
        this.setData({
            imgPath: APP.globalData.imgPath,
            audioPath: APP.globalData.audioPath,
        })
	},
	onReady: function () { //获得popup组件
		this.filter = this.selectComponent("#filter");
	},
	//获取fromId
	formSubmit (e) {
		Utils.getFormId(e);
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
            url: '/pages/common/active/active?id='+id,
        })
    },
    onShow(){
        this.getListenBanner()	//获取轮播图
        this.getListenScategory()	//获取分类
        // this.getListInfo1()          //获取列表数据
        let userinfo = JSON.parse(wx.getStorageSync("userInfo"))
        wx.downloadFile({
            url: userinfo.avatarUrl, 
            type:"image",
            success: res => {
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: function (res) {
                        wx.setStorageSync("img", res.savedFilePath)
                    }
                })
            },
            fail:function(){
                Utils.showToast(err,"err",10000)
            }
        })

    },
    
	//分享
	onShareAppMessage () {
		return Utils.onShareAppMessage()
	},
	//跳转到搜索页
	hanldOpenSearch () {
		wx.navigateTo({
			url: '/pages/common/search/search?url=' + '听故事',
		})
	},
	//获取轮播图
	getListenBanner() {
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/getBanner",
			method: 'GET',
			param: {},
			success:res=> {
				this.setData({
					imgUrls:res.data
				})
			}
		})
	},
	//人气榜  精品榜  新品榜
	handleOpenCollectMoney(e) {
		let title = e.target.dataset.title;
		wx.navigateTo({
			url: '/pages/listen/collectMoney/collectMoney?title=' + title + '&footerIndex=' + 0,
		})
	},
	//获取分类
	getListenScategory() {
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/getStoryType",
			method: 'GET',
			param: {
                type:1,
            },
			success:res=> {
				let icons = res.data
				const pages = [];
				icons.forEach((value, index) => {
					const page = Math.floor(index / 3)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(value)
				})
                console.log(pages)
				this.setData({
					icons: pages
				})
			}
		})
	},
	// 跳转到分类列表页
	handleOpenClassifyList(e) {
		let title = e.currentTarget.dataset.title;
        let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/listen/classifyList/classifyList?footerIndex=' + 0 + '&title=' + title + '&id='+id,
		})
	},
	
	//获取列表数据
	getListInfo () {
		Require.ajax({
			// loading: "1",   //是否开启loading
            url: "Index/getStoryList",
            method: 'GET',
			param: {
				order: this.data.order_type
			},
			success: res=> { 
				console.log(res)
				this.setData({
					list: res.data
				})
			}
		})
	},
    //获取列表数据
    getListInfo1() {
        Require.ajax({
            loading: "1",   //是否开启loading
            url: "/Index/getAlbumList",
            method: 'GET',
            param: {
                page: this.data.page
            },
            success: res => {
             if(res.data=="") {
                 this.setData({
                     page : this.data.page - 1
                 })
                    Utils.showToast("没有更多数据")
                    return;
                }
              if (res.code == 200){
                  const oldData = this.data.list;
                    this.setData({
                        list: [...oldData,...res.data]
                    },()=>{
                        console.log(this.data.list)
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
        this.getListInfo1()
    },
	//切换最新播放量
	handleToggleOrderType (e) {
		let type = this.data.order_type;
		let index = e.currentTarget.dataset.index;
		switch (index) {
			case '1': this.setData({ order_type: type == 1 ? 2 : 1});break;
			case '1': this.setData({ order_type: type == 2 ? 1 : 1 }); break;
			case '3': this.setData({ order_type: type == 3 ? 4 : 3 }); break;
			case '3': this.setData({ order_type: type == 4 ? 3 : 3 }); break;
		}
		this.getListInfo()	  //获取列表数据
	},
	//跳转故事页
	handleOpenDetails (e) {
		let index = e.currentTarget.dataset.index;
		wx.navigateTo({
            url: '/pages/listen/listStory/listStory?id=' + index + '&footerIndex=' + '0&title=' +"听故事"
		})
	},

	//弹出筛选
	handleOpenFilter() {
		this.filter.showModal();
	},
	//接收筛选信息
	getFilterInfo (e) {
        
		let filter = e.detail;

		Require.ajax({
			loading: "1",   //是否开启loading
            url: "Index/screenStory",
			method: 'POST',
			param: {
                age: filter.age_id,
                sex: filter.sex_id,
                storyTypeID: filter.classify_id
			},
			success: res=>{
				console.log(res)
				if (res.code == 200 && res.data instanceof Array) {
					this.setData({
						list: res.data
					})
				}else {
					Utils.showToast(res.msg)
					this.setData({
						list: []
					})	
				}
			}
		})
	}
})
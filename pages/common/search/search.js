//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		url: '',		//听故事/讲故事
		search_val: '',
		history: [], 	//搜索历史
		list: [],		//搜索列表
        imgPath:"",
	},
	onLoad: function (options) {
		this.setData({
			url: options.url,
            imgPath: APP.globalData.imgPath
		})
		this.handleGetSearchHistory();
	},
	//收集formId
	formSubmit (e) {
		Utils.getFormId(e); //获取formId	
	},
	//搜索框变化
	handleGetInputVal (e) {
		let search_val = e.detail.value;
		if (search_val == '') {
			this.handleGetSearchHistory()
		}
		this.setData({
			search_val: search_val
		})
	},
    //获取搜索列表
    handleGetSearchList1() {
        const userId = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "Speak/search",
            method: 'GET',
            param: {
                keyWord: this.data.search_val,
                userID: userId
            },
            success: res=> {
                if (res.code == 200) {
                    let arr = []
                    if (res.albumList && res.albumListForUser) {
                         arr = [...res.albumList, ...res.albumListForUser]
                    }else {
                         arr = (res.albumList || res.albumListForUser)
                    }
                    // 去重
                    for (let i=0; i<arr.length; i++) {
                        for (let j=0; j < arr.length; j++){
                            if (i!=j) {
                                if (arr[i].id==arr[j].id) {
                                    arr.splice(j, 1)
                                }
                            }
                        }
                    }
                    if (arr == "") {
                        Utils.showToast("暂无相关专辑")
                    }
                    this.setData({
                        list: arr
                    })
                } else {
                    Utils.showToast(res.err)
                }
            }
        })
    },
	//获取搜索列表
	handleGetSearchList () {
        const userId = wx.getStorageSync("id")
        if (!this.data.search_val){
            Utils.showToast("请输入搜索关键词")
            return;
        }
		Require.ajax({
			loading: "1",   //是否开启loading
            url: "Index/search",
			method: 'GET',
			param: {
                keyWord: this.data.search_val,
                userID: userId
			},
			success:res=> {
				if (res.code == 200) {
                    if(res.data=="") {
                        Utils.showToast("暂无相关专辑")
                    }
					this.setData({
						list: res.data
					})
				} else {
                    Utils.showToast(res.err)
				}
			}
		})
	},
	//跳转到对应模块
	handleOpenUrl (e) {
		let url = this.data.url;
		if (url == '听故事') {
			wx.navigateTo({
                url: '/pages/listen/listStory/listStory?id=' + e.currentTarget.dataset.id+"&title="+url,
			})
			return;
		}
		if (url == '讲故事') {
			wx.navigateTo({
                url: '/pages/listen/listStory/listStory?id=' + e.currentTarget.dataset.id+"&title=" + url,
			})
			return;
		}
	},
	// 搜索记录
	handleGetSearchHistory () {
        const userId = wx.getStorageSync("id")
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/getSearchHistory",
            method: 'GET',
			param: {
                userID:userId
            },
			success: res=> {
				if (res.code == 200 && res.data instanceof Array) {
					this.setData({
						history: res.data
					})
				} else {
					this.setData({
						history: []
					})
				}
			}
		})
	},
	// 清空搜索记录
	handleClearHistotySearch () {
        const userId = wx.getStorageSync("id")
        console.log(userId)
		Require.ajax({
			//loading: "1",   //是否开启loading
            url: "Index/delSearchHistory",
			method: 'POST',
			param: {
                userID: userId
            },
			success: res=> {
				if (res.code == 200) {
					this.handleGetSearchHistory()
				} else {
					Utils.showToast(res.msg, 'err')
				}
			}
		})
	},
    // 点击历史记录搜索
    handleHistorySearch(e){
        const val = e._relatedInfo.anchorTargetText.replace(/\s+/g, '')
        this.setData({
            search_val:val,
        },()=>{
            if(this.data.url=="听故事"){
                this.handleGetSearchList()
            }else{
                this.handleGetSearchList1()
            }
        })
    }

})

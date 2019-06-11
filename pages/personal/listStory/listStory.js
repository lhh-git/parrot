//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		menu: ["简介", "已上传"],
		menu_id: 1,
		describe: '',		//简介
		tab_input: '',		//标签input
		tab: '',			//标签
		tabs: [],			//标签集合
        id:"",              //专辑id
        detail:"",
		status: false,		//完结状态
		//侧滑删除
		items: [],
		startX: 0, //开始坐标
		startY: 0,
        title:"",
        userinfo:"",
        imgPath:""
	},
	onLoad: function (options) {
        console.log(options)
		// for (var i = 0; i < 10; i++) {
		// 	this.data.items.push({
		// 		content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
		// 		isTouchMove: false, //默认隐藏删除
                
		// 	})
		// }
        let userinfo = wx.getStorageSync("img")
		this.setData({
			items: this.data.items,
            id: options.id,
            title: options.title,
            userinfo: userinfo,
            imgPath: APP.globalData.imgPath
		},()=>{
            this.handleList()
            this.handleGetClassifyInfo()
        });
	},
	//收集formId
	formSubmit (e) {
		Utils.getFormId(e); //获取formId	
	},
	//是否完结
	switchChange (e) {
		this.setData({
			status: e.detail.value
		},()=>{
            const userId = wx.getStorageSync("id")
            Require.ajax({
                //loading: "1",   //是否开启loading
                url: "User/setAlbumClose",
                method: 'POST',
                param: {
                    userID: userId,
                    albumID: this.data.id,
                    isClose: this.data.status?1:0,
                },
                success(res) {
                    if (res.code === 200) {
                        // Utils.showToast('创建成功', 'success')
                    }
                }
            })
        })
	},
    handleList(){
        const userId = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "User/userAlbumDetails",
            method: 'GET',
            param: {
                userID: userId,
                albumID: this.data.id,
            },
            success:res=> {
                if (res.code == 200) {
                    let arr = res.data
                    for (let i = 0; i < arr.length; i++) {
                        arr[i]["isTouchMove"] = false

                    }
                    if (res.albumInfo&&res.albumInfo.isClose > 0 && this.data.title != '默认专辑' && this.data.title != '草稿箱') {
                        this.setData({
                            status:true
                        })
                    }
                    this.setData({
                        list: arr,
                        detail: res.albumInfo
                    })
                }
            }
        })
    },
	//菜单切换
	handleToggleMenu (e) {
		const index = e.currentTarget.dataset.index;
		this.setData({
			menu_id: index
		})
	},
	//跳转到作品播放页
	handleWorksPlay (e) {
		wx.navigateTo({
			url: '/pages/speak/worksPlay/worksPlay?id='+e.currentTarget.dataset.id,
		})
	},
	//简介
	handleTextarea (e) {
		this.setData({
			describe: e.detail.value
		})
	},
	//监听标签input输入
	handleTabInput (e) {
		let val = e.detail.value;
		this.setData({
			tab_input: val
		})
	},
	//添加标签
	handleAddTabs () {
		let val = this.data.tab_input;
		let tabs = this.data.tabs;
		tabs.push(val);
		this.setData({
			tabs: tabs,
			tab_input: ''
		})
	},
    // 刪除
    handleDetele(e) {
        wx.showModal({
            content: '是否删除？',
            confirmText: "确认",
            cancelText: "取消",
            success: res => {
                if (res.confirm) {
                    Require.ajax({
                        //loading: "1",   //是否开启loading
                        url: "User/delUserStory",
                        method: 'POST',
                        param: {
                            storyID: e.currentTarget.dataset.id,
                        },
                        success: res => {
                            if (res.code == 200) {
                                Utils.showToast('删除成功', "success")
                                this.handleList()
                            }
                        }
                    })
                }
            }
        });
    },

    //获取分类数据
    handleGetClassifyInfo() {
        let _this = this;
        let arr = [];
        const userId = wx.getStorageSync("id")
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "User/userHomePage",
            method: 'GET',
            param: {
                id: userId,
            },
            success(res) {
                res.data.albumList.forEach((item, index) => {
                    if (_this.data.title != item.name) {
                        arr.push(item.name);
                    }
                })
                console.log(arr)
                _this.setData({
                    classify_arr: res.data.albumList,
                    classify: arr,
                    classify_selid: res.data.albumList[0].id
                })
            }
        })
    },
    // 移動
    handleGo(e) {
        let _this = this;
        let storyid = e.currentTarget.dataset.id
        wx.showActionSheet({
            itemList: this.data.classify,
            success(res) {
                let classify = _this.data.classify_arr;
                let classify_sel = _this.data.classify[res.tapIndex];
                classify.forEach((val, index) => {
                    if (val.name == classify_sel) {
                        _this.setData({
                            classify_sel: classify_sel,
                            classify_selid: val.id,
                            name: val.name,
                            storyid: storyid
                        }, () => {
                            _this.handleGoAlbum()
                        })

                    }
                })
            }
        })
    },
    handleGoAlbum() {
        let go
        if (this.data.name == "草稿箱") {
            go=0
        } else {
            go = 1
        }
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "User/moveStory",
            method: 'POST',
            param: {
                storyID: this.data.storyid,
                albumID: this.data.classify_selid,
                isDraft: go,
            },
            success: res => {
                if (res.code == 200) {
                    this.handleList()
                }
            }
        })
    },
	//手指触摸动作开始 记录起点X坐标
	touchstart: function (e) {
		//开始触摸时 重置所有删除
		this.data.list.forEach(function (v, i) {
			if (v.isTouchMove) //只操作为true的
				v.isTouchMove = false;

		})
		this.setData({
			startX: e.changedTouches[0].clientX,
			startY: e.changedTouches[0].clientY,
            list: this.data.list
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

        that.data.list.forEach(function (v, i) {
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
            list: that.data.list
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








})



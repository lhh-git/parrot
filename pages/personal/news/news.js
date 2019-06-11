//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'

Page({
	data: {
		// txt: '通知,是向特定受文对通知,是向特定受文对通知,是向特定受文对通知,是是向特定受文对通知,是',
        list:"",
        id:"",
	},
	onLoad: function (options) {
		// console.log(this.data.txt.substring(0, 20))
		this.handleGetFormId()
	},
	//收集formId
	formSubmit(e) {
		Utils.getFormId(e); //获取formId	
	},
	// 获取模板消息
	handleGetFormId () {
        const userId = wx.getStorageSync("id")
		Require.ajax({
			// loading: "1",   //是否开启loading
            url: "User/getMessageList",
            method: 'GET',
			param: {
                id: userId,
            },
			success:res=> {
                let arr = res.data
                for(let i=0; i<arr.length; i++) {
                    arr[i]["con"] = arr[i].content
                    let con = arr[i].content.substring(0, 20)
                    arr[i].content = con
                }
                console.log(arr)
                this.setData({
                    list: arr
                })
			}
		})
	},
    handleOpen(e) {
       const id = e.currentTarget.dataset.id
       this.setData({
           id:id
       })
    }

})





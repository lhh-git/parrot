//获取应用实例
const APP = getApp()
import Utils from '../../../utils/util.js'
import Require from '../../../utils/require.js'


Page({
	data: {
		name: '234',			//canvas数据
		avatarUrl: '',		//canvas数据

		time: 0,            //录制时长
	},
	onLoad: function (options) {
		this.handleGetCanvalInfo();
		
	},
	//获取fromId
	formSubmit(e) {
		Utils.getFormId(e);
	},
	// 转发
	onShareAppMessage () {
		Utils.onShareAppMessage();
		
	},





	// canvas生成海报
	handleGetCanvalInfo () {
		let _this = this;
		wx.getUserInfo({
			success: res => {
				this.setData({
					name: res.userInfo.nickName,
					avatarUrl: res.userInfo.avatarUrl
				}, () => {
					this.createNewImg()
				})
				// wx.downloadFile({
				// 	url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
				// 	success: function (res) {
				// 		// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				// 		if (res.statusCode === 200) {
				// 			console.log(res, "reererererer")
				// 			_this.setData({
				// 				touxiang: res.tempFilePath
				// 			})
				// 		}
				// 	}
				// })
			}
		})
	},
	// 给canvas填充数据
	createNewImg () {
		let _this = this;
		let context = wx.createCanvasContext('mycanvas');
		// 绘制头像
		console.log(this.data.avatarUrl)
		let path1 = this.data.avatarUrl;
		context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
		context.strokeStyle = "#fff";
		context.clip(); //裁剪上面的圆形
		context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
		

		//绘制名字
		let name = this.data.name;
		context.setFontSize(16.5);
		context.setFillStyle('#622F2D');
		context.setTextAlign('center');
		context.fillText(name, 170, 200);
		context.stroke();


		context.draw();
	}




})
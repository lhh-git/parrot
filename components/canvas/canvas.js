//获取应用实例
import Utils from '../../utils/util.js'
import Require from '../../utils/require.js'

Component({
	properties: {
            title: {
                type: [String]
            },
            content: {
                type: [String]
            }
	    },
	data: {
		isCanvas: false,
		Width: '',			//canvas数据
		Height: '',			//canvas数据
		name: '',			//canvas数据
		avatarUrl: '',		//canvas数据

	},
	lifetimes: {
		attached() {	// 在组件实例进入页面节点树时执行
			
		},
	},
	methods: {
		//获取fromId
		formSubmit(e) {
			Utils.getFormId(e);
		},
		// canvas生成海报
		handleGetCanvalInfo() {
			let _this = this;
			wx.getSystemInfo({
				success: res => {
					_this.setData({
						isCanvas: true,
						Width: res.screenWidth,
						Height: res.screenHeight
					})
				}
			})

            const userInfo = JSON.parse(wx.getStorageSync("userInfo"))
            const img = wx.getStorageSync("img")
            this.setData({
                name: userInfo.nickName,
                avatarUrl: img
            },()=>{
                this.createNewImg()
            })
		},
		// 给canvas填充数据
		createNewImg() {
			let _this = this;
			let width = this.data.Width;
			let height = this.data.Height;
            let context = wx.createCanvasContext('mycanvas',this);
			//绘制背景图片
			let canvas_bg='/images/canvas_bg.png'
			context.drawImage(canvas_bg, 0, 0, width * 0.8, height * 0.72);
            let code = '/images/code.jpg'
            context.drawImage(code, (width / 2) - 90, (height * 0.72)-120, 100, 100);
			// 绘制头像
			let path1 = this.data.avatarUrl;
            console.log(path1)
			let avatarurl_width = 73;    //绘制的头像宽度
			let avatarurl_heigth = 73;   //绘制的头像高度
			let avatarurl_x =width/2-avatarurl_width;  //绘制的头像在画布上的位置
			let avatarurl_y = height * 0.05;   //绘制的头像在画布上的位置
          
            context.strokeStyle = "#fff";
           
			context.save();
			context.beginPath(); //开始绘制
			//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
			context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false); 
			context.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
			context.drawImage(path1, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
			context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制 

			//绘制名字
			let name = this.data.name;
			context.setFontSize(16.5);
			context.setFillStyle('#622F2D');
			context.fillText(name, (width * 0.8 - context.measureText(name).width) / 2, height * 0.21);
			context.stroke();

			//绘制描述
			let describe = '我录了一段配音送给你，快来听听吧！';
			context.setFontSize(15);
			context.setFillStyle('#622F2D');
			context.fillText(describe, (width * 0.8 - context.measureText(describe).width) / 2, height * 0.25);
			context.stroke();

			//绘制标题
            let title = '《'+this.data.title+'》';//'《海的女儿》';
			context.setFontSize(15);
			context.setFillStyle('#622F2D');
			context.fillText(title, (width * 0.8 - context.measureText(title).width) / 2, height * 0.3);
			context.stroke();

			//绘制内容
			let str = this.data.content;/*'在海的远处，水是那么蓝，像最美丽的矢车菊花瓣，同时又是那么清，像最明亮的玻璃。然而它是很深很深，深得任何锚链都达不到底。要想从海底一直达到水面，必须范德萨萨芬的水电费';*/
			let count = 19;

			let page0 = str.slice(0, count);
			console.log(page0)
			context.setFontSize(12.5);
			context.setFillStyle('#622F2D');
			context.fillText(page0, (width * 0.8 - context.measureText(page0).width) / 2, height * 0.35);
			context.stroke();

			let page1 = str.slice(count, count * 2);
			context.setFontSize(12.5);
			context.setFillStyle('#622F2D');
			context.fillText(page1, (width * 0.8 - context.measureText(page1).width) / 2, height * 0.38);
			context.stroke();

			let page2 = str.slice(count * 2, count * 3);
           
			context.setFontSize(12.5);
			context.setFillStyle('#622F2D');
			context.fillText(page2, (width * 0.8 - context.measureText(page2).width) / 2, height * 0.41);
			context.stroke();

			let page3 = str.slice(count * 3, count * 4);
			context.setFontSize(12.5);
			context.setFillStyle('#622F2D');
			context.setGlobalAlpha(0.5);
			context.fillText(page3, (width * 0.8 - context.measureText(page3).width) / 2, height * 0.44);
			context.stroke();
			context.draw();
		},
		// 保存海报
		handleSaveCanvas() {
            // 图片授权
            wx.getSetting({
                success:res=>{
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success:()=> {
                                wx.canvasToTempFilePath({
                                    canvasId: 'mycanvas',
                                    success: function (res) {
                                        wx.saveImageToPhotosAlbum({
                                            filePath: res.tempFilePath,
                                            success(result) {
                                                console.log(result)
                                                Utils.showToast('图片保存成功', 'success')
                                            }
                                        })
                                    }
                                }, this)
                            },
                            fail: function (res) {
                                //重新获取用户录音授权
                                wx.showModal({
                                    content: '检测到您没打开相册权限，是否去设置打开？',
                                    confirmText: "确认",
                                    cancelText: "取消",
                                    success: function (res) {
                                        if (res.confirm) {
                                            wx.openSetting({})
                                        }
                                    }
                                });
                            }
                        })
                    }else{
                        wx.canvasToTempFilePath({
                            canvasId: 'mycanvas',
                            success: function (res) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success(result) {
                                        console.log(result)
                                        Utils.showToast('图片保存成功', 'success')
                                    }
                                })
                            }
                        }, this)
                    }
                }
            })
			
		},
		// 关闭海报
		handleHideCanvas() {
			this.setData({
				isCanvas: false
			})
		}



	}


})


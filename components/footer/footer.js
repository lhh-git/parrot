Component({
	properties: {
		footerIndex: {
			type: [Number, String]
		},
	},
    data: {
        list: [{
            id: '1',
			icon: '../../images/icon_listen.png',
			icon_sel: '../../images/icon_listen_sel.png',
            url: '/pages/listen/listenIndex/listenIndex',
            title: '听故事'
        }, {
            id: "2",
            icon: '../../images/icon_speak.png',
            icon_sel: '../../images/icon_speak_sel.png',
            url: '/pages/speak/speakIndex/speakIndex',
            title: '讲故事'
        }, {
            id: '3',
            icon: '../../images/icon_personalInfo.png',
            icon_sel: '../../images/icon_personalInfo_sel.png',
            url: '/pages/personal/personalIndex/personalIndex',
            title: '我的'
        }]
    },
    methods: {
        handleToggleFooter(e) {
            this.setData({
                footerIndex: e.currentTarget.dataset.index
            }, () => {
				wx.switchTab({
					url: this.data.list[this.data.footerIndex].url
				})
			})	
        }
    }
})
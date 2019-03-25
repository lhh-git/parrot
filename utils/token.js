import Require from './require.js'

function judgeGetSetting() {
	console.log(1)
	// wx.getSetting({
	// 	success(res) {
	// 		console.log(res.authSetting)
	// 	}
	// })
}


// 导出模块
module.exports = {
	judgeGetSetting: judgeGetSetting
}
Page({
	data: {
        story:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
        // this.handleOrderDetail()
	},
    handleOrderDetail() {
        let _this = this;
        Require.ajax({
            //loading: "1",   //是否开启loading
            url: "api/Vip/orderDetail",
            method: 'POST',
            param: {
                id: "1"
            },
            success(res) {
                _this.setData({
                    story: res.data
                })
            }
        })
    }
})
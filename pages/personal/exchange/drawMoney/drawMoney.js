Component({
	data: {
		surplus: 30.00,  //余额
		account: ['exchange_ply.png', 'exchange_wechat.png'],
		account_id: 0,
		money: ['5', '10', '15', '20', '30', '50'],
		money_id: 0,
	},
	methods: {
		// 选择账户
		handleToggleAccount (e) {
			const index = e.currentTarget.dataset.index;
			this.setData({
				account_id: index
			})
		},
		// 选择金额
		handleToggleMoney (e) {
			const index = e.currentTarget.dataset.index;
			if (this.data.surplus - this.data.money[index] >= 0) {
				this.setData({
					money_id: index
				})
			}
			
		}
	}
	
})
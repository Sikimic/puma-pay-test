const Account = require('./account');

module.exports = function(router) {
	router.post('/account/start-transfer', Account.startTransfer);
	// router.get('/accounts/', Account.getAccounts);
	// router.get('/account/transactions', Account.getTransactionsForAccount);
};
const Account = require('./account');

module.exports = function(router) {
	router.post('/account/start-transfer', Account.startTransfer);
	router.get('/accounts', Account.getAll);
	router.get('/account/:id', Account.getById);
	// router.get('/account/transactions', Account.getTransactions);
};
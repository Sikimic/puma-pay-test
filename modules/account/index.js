const Account = require('./account');

module.exports = function(router) {
	router.post('/account/start-transfer', Account.startTransfer);
	router.get('/accounts/', Account.getAllAccounts);
	router.get('/account/:id', Account.getAccountById);
	router.get('/accounts/transactions/', Account.getAllTransactions);
	router.get('/accounts/transaction/:id', Account.getTransactionById);
};
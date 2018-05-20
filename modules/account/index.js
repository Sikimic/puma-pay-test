const Account = require('./account');

module.exports = function(router) {
	router.post('/account/start-transfer', Account.startTransfer);
};
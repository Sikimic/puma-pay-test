const boom 			= require('express-boom');
const _ 			= require('underscore');
const models 		= require('../../models');
const constants 	= require('../../utils/constants');
const scheduler 	= require('./utils/transactions');

module.exports = {

	/**
	* @name <b>startTransfer</b>
	* @path {POST} /account/start-transfer
	* @description Creates a scheduler that start the specified transfer with provided parameters
	* @header
	* @params {string} sourceAccountName - Source account name.
	* @params {string} destinationAccountName - Destination account name.
	* @params {double} amount - Amount to be transfered.
	* @params {datetime} startDateTime - Start date of the scheduler.
	* @params {datetime} endDateTime - End date of the scheduler.
	* @params {int} intervalTime - Interval time for amout to be transfered.
	* @params {string} intervalType - Interval type, values ('M','w','d','h','m','s').
	* @code <b>200</b>: Route handled successfully.
	* @code <b>400</b>: If either of the account has not been found.
	* @code <b>500</b>: When the DB didn't parse the input well.
	* @response succesful submit message
	*/
	startTransfer: (req, res) => {
		const requiredFields = ['sourceAccountName', 'destinationAccountName', 'amount', 'startDateTime', 'endDateTime', 'intervalTime', 'intervalType'];

		for(var item in requiredFields) 
			if (_.isEmpty(req.body[requiredFields[item]]))
				return res.boom.badRequest('Please fill in the ' + requiredFields[item] + ' field.');

			if (parseFloat(req.body['amount']) === NaN) 
				return res.boom.badRequest('Amount must contain a floating value.');

			let startDate = new Date(req.body['startDateTime']);
			let endDate = new Date(req.body['endDateTime']);

			if(!_.isDate(new Date(startDate)) || !_.isDate(endDate) || (endDate.getTime() < startDate.getTime()) || (startDate.getTime() - 15 < new Date().getTime())) 
				return res.boom.badRequest('Invalid Date format.');

			if((req.body['intervalTime'] < 0) || parseInt(req.body['intervalTime']) === NaN) 
				return res.boom.badRequest('The interval time is in an invalid format.');

			if(constants.intervalTypeEnum[req.body['intervalType']] === undefined) 
				return res.boom.badRequest('Interval type has an invalid value.');

			models.account
				.findAll({
					where: {
						name: [req.body['sourceAccountName'], req.body['destinationAccountName']]
					},
				})
				.then(accounts => {
					if (_.isEmpty(accounts) || accounts.length != 2) 
						return res.boom.badRequest('Accounts not found.');
					let accountA = accounts[0].name === req.body['sourceAccountName'] ? accounts[0] : accounts[1];
					let accountB = accounts[0].name === req.body['destinationAccountName'] ? accounts[0] : accounts[1];

					if (accountA.balance < parseFloat(req.body['amount']))
						return res.boom.badRequest('Not enough credits on account.');

					return scheduler.scheduleTransaction(accountA.name, accountB.name, parseFloat(req.body['amount']), startDate, endDate, constants.intervalTypeEnum[req.body['intervalType']] * parseInt(req.body['intervalTime']), models, res);

				}).catch( error => {
					return res.boom.badRequest('Accounts not found.');
				})
	}
};
const schedule 	= require('node-schedule');
const boom 		= require('express-boom');
const _ 		= require('underscore');

const scheduler = {

	scheduleTransaction: (srcAccName, dstAccName, amount, startDate, endDate, interval, models) => {

		schedule.scheduleJob(startDate, function() {

			var intervalID = setInterval(() => {
				return models.sequelize.transaction(t => {
					return models.accounts
					.findAll({
						where: {
							name: [srcAccName, dstAccName]
						},
						transaction: t,
						lock: t.LOCK.UPDATE
					})
					.then(accounts => {
						//do it before
						if (_.isEmpty(accounts) || accounts.length != 2) 
							return res.boom.badRequest('Accounts not found.');

						let accountA = accounts[0].name === srcAccName ? accounts[0] : accounts[1];
						let accountB = accounts[0].name === dstAccName ? accounts[0] : accounts[1];

						if (accountA.balance < amount) {
							clearTimeout(intervalID);
							return res.send('Not enough credits on account.');
						}

						accountA.balance -= amount;
						accountB.balance += amount;

						return accountA
						.save({transaction: t})
						.then(result => {
							return accountB
							.save({transaction: t})
							.catch(error => {
								res.boom.badImplementation('An error occured, please try again.');
							});
						})
						.catch(error => {
							res.boom.badImplementation('An error occured, please try again.');
						});
					})
					.catch(err => {

					});
				})
			}, interval);
		});
	}
};

module.exports = scheduler;

	
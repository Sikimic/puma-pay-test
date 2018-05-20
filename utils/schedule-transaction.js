const schedule 	= require('node-schedule');
const boom 		= require('express-boom');
const _ 		= require('underscore');

const scheduler = {

	scheduleTransaction: (srcAccName, dstAccName, amount, startDate, endDate, interval, models, res) => {

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
						if (_.isEmpty(accounts) || accounts.length != 2) 
							//This should be logged using some logger library
							console.log('Accounts not found.');

						let accountA = accounts[0].name === srcAccName ? accounts[0] : accounts[1];
						let accountB = accounts[0].name === dstAccName ? accounts[0] : accounts[1];

						if (accountA.balance < amount) {
							clearTimeout(intervalID);
							//This should be logged using some logger library
							console.log('Not enough credits on account.');
							return;
						}

						accountA.balance -= amount;
						accountB.balance += amount;

						return accountA.save({transaction: t})
							.then(result => {
								return accountB.save({transaction: t})
									.catch(error => {
										//This should be logged using some logger library
										console.log('An error occured, please try again.');
									});
							}).catch(error => {
								//This should be logged using some logger library
								console.log('An error occured, please try again.');
							});
					})
					.catch(err => {
						//This should be logged using some logger library
						console.log('Accounts not found.');
					});
				})
			}, interval);
		});

		return res.send('Scheduler created with provided params.');
	}
};

module.exports = scheduler;

	
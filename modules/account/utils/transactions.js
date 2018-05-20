const schedule 	= require('node-schedule');
const boom 		= require('express-boom');
const _ 		= require('underscore');

const transaction = {

	scheduleTransaction: (srcAccName, dstAccName, amount, startDate, endDate, interval, models, res) => {

		schedule.scheduleJob(startDate, function() {

			var intervalID = setInterval(() => {
				return models.sequelize.transaction(t => {
					return models.account
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

						let srcAccount = accounts[0].name === srcAccName ? accounts[0] : accounts[1];
						let dstAccount = accounts[0].name === dstAccName ? accounts[0] : accounts[1];

						if (srcAccount.balance < amount) {
							clearTimeout(intervalID);
							//This should be logged using some logger library
							console.log('Not enough credits on account.');
							return;
						}

						srcAccount.balance -= amount;
						dstAccount.balance += amount;

						return srcAccount.save({transaction: t})
							.then(result => {
								return dstAccount.save({transaction: t})
									.then( result2 => {
										saveTransaction(srcAccount, dstAccount, amount, models);
									}).catch(error => {
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
				});
			}, interval);
		});

		return res.send('Schedule created with provided params.');
	}
};

function saveTransaction(srcAccount, dstAccount, amount, models) {
	models.transaction_history.create({
		amount: amount,
		fromAccountId: srcAccount.id,
		toAccountId: dstAccount.id,
	}).then(result => {
		console.log('Transaction saved.');
	}).catch(err => {
		console.log(err);
	});
}

module.exports = transaction;

	
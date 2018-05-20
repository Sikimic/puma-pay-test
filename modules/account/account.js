const boom = require('express-boom');

module.exports = {
	startTransfer: (req, res) => {
		const requiredFields = ['srcAccName', 'dstAccName', 'amount', 'startDateTime', 'endDateTime', 'intervalTime', 'intervalType'];

		for(var item in requiredFields) 
			if (_.isEmpty(req.body[requiredFields[item]]))
				return res.boom.badRequest('Please fill in the ' + requiredFields[item] + ' field.');

			if (parseFloat(req.body['amount']) === NaN) 
				return res.boom.badRequest('Amount must contain a floating value.');

			if(!_.isDate(new Date(req.body['startDateTime'])) || !_.isDate(new Date(req.body['endDateTime']))) 
				return res.boom.badRequest('Invalid Date format.');

			if((req.body['intervalTime'] < 0) || parseInt(req.body['intervalTime']) === NaN) 
				return res.boom.badRequest('The transferIntervalTime is in an invalid format.');


	}
};
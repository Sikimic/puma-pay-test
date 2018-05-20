"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const transactionsUrl = 'accounts/transactions/';

describe('GET ' + transactionsUrl, () => {
	   
	it('Should get all of the transactions.', (done) => {
		chai.request(baseUrl)
			.get(transactionsUrl)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Expect result to be an array.', (done) => {
		chai.request(baseUrl)
			.get(transactionsUrl)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done();
			});
	});

});
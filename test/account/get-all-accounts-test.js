"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const accountsUrl = 'accounts/';

describe('GET ' + accountsUrl, () => {
	   
	it('Get all of the accounts.', (done) => {
		chai.request(baseUrl)
			.get(accountsUrl)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Result to be an array.', (done) => {
		chai.request(baseUrl)
			.get(accountsUrl)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done();
			});
	});

});
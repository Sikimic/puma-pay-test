"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const transactionUrl = 'accounts/transaction/';
let transactionId;

describe('GET ' + transactionUrl + ':id', () => {
	   
	before((done) => {
	    chai.request(baseUrl)
			.get('accounts/transactions/')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				transactionId = res.body[0].id;
				done();
			});
	});

	it('Invalid UUID', (done) => {
		chai.request(baseUrl)
			.get(transactionUrl + '12345')
			.end(function(err, res){
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Missing UUID', (done) => {
		chai.request(baseUrl)
			.get(transactionUrl)
			.end(function(err, res){
				expect(res).to.have.status(404);
				done();
			});
	});

	it('Passed OK', (done) => {
		chai.request(baseUrl)
			.get(transactionUrl + transactionId)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

});
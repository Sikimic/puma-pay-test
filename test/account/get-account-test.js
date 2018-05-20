"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const accountUrl = 'account/';
let accountId;

describe('GET ' + accountUrl + ':id', () => {
	before((done) => {
	    chai.request(baseUrl)
			.get('accounts/')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				accountId = res.body[0].id;
				done();
			});
	});

	it('Invalid UUID', (done) => {
		chai.request(baseUrl)
			.get(accountUrl + '12345')
			.end(function(err, res){
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Missing UUID', (done) => {
		chai.request(baseUrl)
			.get(accountUrl)
			.end(function(err, res){
				expect(res).to.have.status(404);
				done();
			});
	});

	it('Passed OK', (done) => {
		chai.request(baseUrl)
			.get(accountUrl + accountId)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

});
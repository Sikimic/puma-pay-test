"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const faker 	= require('faker');
const constants = require('../../utils/constants');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const accountUrl = 'account/';
const startTransferUrl = 'start-transfer';

let transactionWrapper = {
  sourceAccountName: faker.name.firstName(),
  destinationAccountName: faker.name.lastName(),
  amount: randomstring.generate(10)+'@'+randomstring.generate(4)+'.com',
  startDateTime: faker.phone.phoneNumber(),
  intervalTime:'sikret',
  intervalType:'sikret'
};

chai.use(chaiHttp);

describe('POST ' + createUrl, () => {

	it('driver.create missing firstName', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.firstName;
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create empty required field', (done) => {
		let tempTransaction = clone(driverObj);
		tempTransaction.firstName = '';
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create missing lastName', (done) => {
	let tempTransaction = clone(driverObj);
	delete tempTransaction.lastName;
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create missing email', (done) => {
		let tempTransaction = clone(driverObj);
		delete tempTransaction.email;
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create invalid email format', (done) => {
		let tempTransaction = clone(driverObj);
		tempTransaction.email = 'a.z.com';
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create missing password', (done) => {
		let tempTransaction = clone(driverObj);
		delete tempTransaction.password;
		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('driver.create OK', (done) => {
		let tempTransaction = clone(driverObj);

		chai.request(baseUrl)
			.post(createUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

});
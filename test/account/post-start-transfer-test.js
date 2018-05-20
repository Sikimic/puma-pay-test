"use strict";

const chai 		= require('chai');
const chaiHttp 	= require('chai-http');
const faker 	= require('faker');
const clone 	= require('clone');
const expect 	= chai.expect; 
chai.use(chaiHttp);

const baseUrl = 'localhost:3000/';
const startTransferUrl = 'account/start-transfer';

let endDateTime = faker.date.future();

let transactionWrapper = {
  amount: (Math.random() * 1000) + '',
  startDateTime: faker.date.between(new Date(), endDateTime),
  endDateTime: endDateTime,
  intervalTime: (Math.floor(Math.random() * 10) + 1) + '',
  intervalType: 's'
};

chai.use(chaiHttp);

describe('POST ' + startTransferUrl, () => {
	before((done) => {
	    chai.request(baseUrl)
			.get('accounts/')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				transactionWrapper.sourceAccountName = res.body[0].name;
				transactionWrapper.destinationAccountName = res.body[1].name;
				done();
			});
	});

	it('startTransaction missing amount', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.amount;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction empty required field', (done) => {
		let tempTransaction = clone(transactionWrapper);
		tempTransaction.amount = '';
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction missing sourceAccountName', (done) => {
	let tempTransaction = clone(transactionWrapper);
	delete tempTransaction.sourceAccountName;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction missing destinationAccountName', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.destinationAccountName;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction invalid interval type format', (done) => {
		let tempTransaction = clone(transactionWrapper);
		tempTransaction.intervalType = 'a';
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction missing intervalTime', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.intervalTime;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction missing startDateTime', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.startDateTime;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction missing endDateTime', (done) => {
		let tempTransaction = clone(transactionWrapper);
		delete tempTransaction.endDateTime;
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				// expect(err).to.not.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('startTransaction OK', (done) => {
		let tempTransaction = clone(transactionWrapper);
		chai.request(baseUrl)
			.post(startTransferUrl)
			.send(tempTransaction)
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

});
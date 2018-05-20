'use strict';

const uuid      = require('uuid/v4');
const faker     = require('faker');


module.exports = {
    up: (queryInterface, Sequelize) => {

        const accounts = [];
        const bulkDataLength = 1000;

        for (let i = 0; i < bulkDataLength; i++) {
            accounts.push({
                id: uuid(),
                name: faker.fake("{{company.companyName}} {{company.companySuffix}}, {{finance.accountName}} from {{address.country}}"),
                balance: Math.floor(Math.random() * 10000),
            });
        }


        return queryInterface.bulkInsert('accounts', accounts)
            .then( result => {
                console.log(result);
            })
            .catch( error => {
                console.log(error);
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accounts');
    }
};

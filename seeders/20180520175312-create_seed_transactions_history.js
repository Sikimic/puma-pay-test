'use strict';

const uuid = require('uuid/v4');
const models = require('../models');
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {


        const transaction = [];
        const bulkDataLength = 1000;

        return models.account.findAll()
            .then(result => {
                for (let i = 0; i < bulkDataLength; i++) {
                    transaction.push({
                        id: uuid(),
                        from_account_id: result[i].id,
                        to_account_id: result[i+1].id,
                        amount: Math.random() * 1000,
                    });
                }

                return queryInterface.bulkInsert('transaction_histories', transaction)
                    .then( result => {
                        // console.log(result);
                    })
                    .catch( error => {
                        // console.log(error);
                    });
            })
        
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('transaction_histories', null);
    }
};

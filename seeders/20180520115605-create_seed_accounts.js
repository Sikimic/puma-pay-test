'use strict';

const uuid = require('uuid/v4');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const accounts = [
            {
                id: uuid(),
                name: 'A',
                balance: 100.0,
            },
            {
                id: uuid(),
                name: 'B',
                balance: 100.0,
            }
        ];

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

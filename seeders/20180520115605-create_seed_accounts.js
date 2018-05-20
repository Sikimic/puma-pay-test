'use strict';

const uuid = require('uuid/v4');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const accounts = [{

        }];

        return queryInterface.bulkInsert('Person', accounts);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accounts');
    }
};

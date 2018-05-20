'use strict';

const uuid = require('uuid/v4');
const models = require('../models');
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {


        // return models.account
        //     .findAll({
        //         order: [
        //             Sequelize.fn( 'RANDOM' )
        //         ]
        //     });

        // return queryInterface.bulkInsert('transactions_history',);
    },

    down: (queryInterface, Sequelize) => {
        // return queryInterface.bulkDelete('transactions_history', null);
    }
};

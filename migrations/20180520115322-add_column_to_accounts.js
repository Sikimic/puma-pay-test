'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        // let nameDefinition = {
        //     type: Sequelize.STRING,
        //     unique: true,
        //     allowNull: false
        // };

        // return queryInterface.addColumn('accounts', 'name', nameDefinition, null);
    },

    down: (queryInterface, Sequelize) => {
        // return queryInterface.removeColumn('name');
    }
};

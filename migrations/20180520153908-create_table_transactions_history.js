'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transaction_histories', { 

            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4(),
            },

            amount: {
                field: 'amount',
                type: Sequelize.DOUBLE,
            },

            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },

            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },

            deletedAt: {
                field: 'deleted_at',
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('transaction_histories');
    }
};

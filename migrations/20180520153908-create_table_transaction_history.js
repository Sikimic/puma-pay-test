'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transaction_history', { 

            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4(),
            },

            fromAccountId: {
                field: 'from_account_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'accounts',
                    key: 'id'
                },
            },

            toAccountId: {
                field: 'to_account_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'accounts',
                    key: 'id'
                },
            },

            amount: {
                field: 'amount',
                type: Sequelize.DOUBLE,
                allowNull: false
            },

            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE
            },

            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE
            },

            deletedAt: {
                field: 'deleted_at',
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('transaction_history');
    }
};

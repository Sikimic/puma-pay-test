'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accounts', { 

            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4(),
            },

            balance: {
                type: Sequelize.DOUBLE,
                defaultValue: 0.0,
            },

            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                defaultValue: Sequelize.literal('NOW()')
            },

            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
                defaultValue: Sequelize.literal('NOW()')
            },
              
            deletedAt: {
                type: Sequelize.DATE,
                field: 'deleted_at'
            }

        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('accounts');
    }  
};

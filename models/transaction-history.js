"use strict";

const Sequelize = require('sequelize');
const Account   = require('./account');

module.exports = function (sequelize) {
    const TransactionHistory = sequelize.define('transaction_history', {

        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4(),
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

    }, {
        paranoid: true
    });

    TransactionHistory.associate = (models) => {
        TransactionHistory.belongsTo(models.account, {
            as: 'from_account',
            foreignKey: 'from_account_id',
            targetKey: 'id'
        });
        TransactionHistory.belongsTo(models.account, {
            as: 'to_account',
            foreignKey: 'to_account_id',
            targetKey: 'id'
        });
    }

    return TransactionHistory;
};
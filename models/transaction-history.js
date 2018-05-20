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

        fromAccountId: {
            field: 'from_account_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'account',
                key: 'id'
            },
        },

        toAccountId: {
            field: 'to_account_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'account',
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

    }, {
        paranoid: true
    });

    TransactionHistory.associate = (models) => {
        TransactionHistory.FromAccount = TransactionHistory.belongsTo(models.account);
        TransactionHistory.ToAccount = TransactionHistory.belongsTo(models.account);
    }

    return TransactionHistory;
};
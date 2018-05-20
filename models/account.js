"use strict";

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Account = sequelize.define('account', {

        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4(),
        },

        name: {
            field: 'name',
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },

        balance: {
            field: 'balance',
            type: Sequelize.DOUBLE,
            defaultValue: 0.0
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

    Account.associate = (models) => {
        Account.hasMany(models.transaction_history, {
          foreignKey: 'from_account_id',
        });
        Account.hasMany(models.transaction_history, {
          foreignKey: 'to_account_id',
        });
    }

    return Account;
};
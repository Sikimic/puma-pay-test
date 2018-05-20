"use strict";

const Sequelize require('sequelize');

module.exports = function (sequelize) {
    const Enum = sequelize.define('enum', {

        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4(),
        },

        month: {
            field: 'M',
            type: Sequelize.BIGINT,
            unique: true,
            allowNull: false
        },

        week: {
            field: 'w',
            type: Sequelize.INTEGER,
            defaultValue: 0.0
        },

        day: {
            field: 'd',
            type: Sequelize.INTEGER,
            defaultValue: 0.0
        },

        hour: {
            field: 'h',
            type: Sequelize.INTEGER,
            defaultValue: 0.0
        },

        minute: {
            field: 'm',
            type: Sequelize.INTEGER,
            defaultValue: 0.0
        },

        second: {
            field: 'w',
            type: Sequelize.INTEGER,
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

    return Enum;
};
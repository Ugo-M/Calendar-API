'use strict';
module.exports = (sequelize, DataTypes) => {
    const Calendar = sequelize.define('Calendar', {
        user_id: DataTypes.INTEGER,
        calendar_name: DataTypes.STRING
    });
    Calendar.associate = function (models) {
        Calendar.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Calendar.hasMany(models.Event, {
            foreignKey: 'calendar_id',
            as: 'events',
        });
    };
    return Calendar;
};
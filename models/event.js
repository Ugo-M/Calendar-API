'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        calendar_id: DataTypes.INTEGER,
        event_name: DataTypes.STRING,
        event_beginning: DataTypes.DATE,
        event_end: DataTypes.DATE,
        event_type: DataTypes.STRING
    });
    Event.associate = function (models) {
        Event.belongsTo(models.Calendar, {
            foreignKey: 'calendar_id',
            as: 'calendar'
        });
    };
    return Event;
};
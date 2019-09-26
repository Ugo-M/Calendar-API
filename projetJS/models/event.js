'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_name: DataTypes.STRING,
    event_beginning: DataTypes.DATE,
    event_end: DataTypes.DATE,
    event_type: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Calendar, {
      through: 'CalendarEvent',
      as: 'calendars',
      foreignKey: 'event_id'
    });
  };
  return Event;
};
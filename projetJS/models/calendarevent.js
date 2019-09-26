'use strict';
module.exports = (sequelize, DataTypes) => {
  const CalendarEvent = sequelize.define('CalendarEvent', {
    calendar_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  CalendarEvent.associate = function(models) {
    // associations can be defined here
  };
  return CalendarEvent;
};
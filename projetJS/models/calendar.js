'use strict';
module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    user_id: DataTypes.INTEGER,
    calendar_name: DataTypes.STRING
  }, {});
  Calendar.associate = function(models) {
    Calendar.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Calendar.belongsToMany(models.Event, {
      through: 'CalendarEvent',
      as: 'events',
      foreignKey: 'calendar_id'
    });  };
  return Calendar;
};
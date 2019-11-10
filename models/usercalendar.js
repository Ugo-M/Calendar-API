'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCalendar = sequelize.define('UserCalendar', {
    user_id: DataTypes.INTEGER,
    calendar_id: DataTypes.INTEGER
  }, {});
  UserCalendar.associate = function(models) {
    // associations can be defined here
  };
  return UserCalendar;
};
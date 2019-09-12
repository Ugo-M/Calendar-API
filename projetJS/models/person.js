'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    person_name: DataTypes.STRING,
    person_firstname: DataTypes.STRING,
    department_id: DataTypes.INTEGER
  }, {});
  Person.associate = function(models) {
    Person.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department'
    });
  };
  return Person;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        department_name: DataTypes.STRING
    });
    Department.associate = function (models) {
        Department.hasMany(models.Person, {
            foreignKey: 'department_id',
            as: 'persons',
        });
    };
    return Department;
};
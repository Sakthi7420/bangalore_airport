"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = down;
exports.up = up;
var _sequelize = require("sequelize");
async function up(queryInterface) {
  // Create the 'Courses' table
  await queryInterface.createTable('Employees', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Employee_Name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    Score: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    Result: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    Certificate: {
      type: _sequelize.DataTypes.TEXT('long'),
      allowNull: false
    },
    createdBy: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false
    }
  });
  await queryInterface.sequelize.query(`ALTER TABLE Employees
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
`);
}
async function down(queryInterface) {
  // Drop the 'Courses' table
  await queryInterface.dropTable('Employees');
}
//# sourceMappingURL=20250315115245-create-employee-table.js.map
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Create the 'Courses' table
  await queryInterface.createTable('Employees', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Employee_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Certificate: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.sequelize.query(
    `ALTER TABLE Employees
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
`)
}  

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Drop the 'Courses' table
  await queryInterface.dropTable('Employees');
}
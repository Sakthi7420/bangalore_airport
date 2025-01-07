import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Create the 'AssignmentCompletion' table
  await queryInterface.createTable('AssignmentCompletions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    courseAssignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CourseAssignments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    traineeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    obtainedMarks: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    assignStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    assignEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    courseAssignmentAnswerFile: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE AssignmentCompletions
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
  `);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Drop the 'AssignmentCompletions' table
  await queryInterface.dropTable('AssignmentCompletions');
}

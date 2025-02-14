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

    obtainedMarks: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    courseAssignmentAnswerFile: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
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

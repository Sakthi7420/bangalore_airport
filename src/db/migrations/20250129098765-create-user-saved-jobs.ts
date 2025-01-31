import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('UserSavedJobs', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Referencing the 'Users' table
        key: 'id' // Referencing the 'id' column in Users table
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    jobBoardId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'JobBoards', // Referencing the 'JobBoards' table
        key: 'id' // Referencing the 'id' column in JobBoards table
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE UserSavedJobs
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
  `);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('UserSavedJobs');
}

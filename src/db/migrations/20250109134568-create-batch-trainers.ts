import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('BatchTrainers', {
    batchModuleScheduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BatchModuleSchedules',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    trainerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Now referencing 'Permissions' by 'action'
        key: 'id' // Matching the 'id' column as primary key
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE BatchTrainers
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
  `);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('BatchTrainees');
}

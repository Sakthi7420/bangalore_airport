import { QueryInterface, DataTypes, literal } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('RolePermissions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Roles',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          action: {
            type: DataTypes.STRING,
            references: {
              model: 'Permissions',
              key: 'action',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          createdAt: { type: DataTypes.DATE, allowNull: false },
          updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
      
        await queryInterface.sequelize.query(`
          ALTER TABLE RolePermissions
          MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
        `);
      }

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('RolePermissions');
}
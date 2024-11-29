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
          permissionId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Permissions',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
    });

}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('RolePermissions');
}
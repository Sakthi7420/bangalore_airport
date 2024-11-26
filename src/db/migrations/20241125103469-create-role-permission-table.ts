import { Pool } from 'mysql2/typings/mysql/lib/Pool';
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
            allowNull: false
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false
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

    await queryInterface.addConstraint('RolePermissions', {
        fields: ['roleId'],
        type: 'foreign key',
        name: 'FK_rolePermissions_roleId_roles',
        references: {
            table: 'Roles',
            field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('RolePermissions', {
        fields: ['permissionId'],
        type: 'foreign key',
        name: 'FK_rolePermissions_permissionId_permissions',
        references: {
            table: 'Permissions',
            field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeConstraint(
        'RolePermissions',
        'FK_rolePermissions_roleId_roles'
    );
    await queryInterface.removeConstraint(
        'RolePermissions',
        'FK_rolePermissions_permissionId_permissions'
    );
    await queryInterface.dropTable('RolePermissions');
}
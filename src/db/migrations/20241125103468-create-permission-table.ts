import { QueryInterface, DataTypes, literal } from 'sequelize';


export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('Permissions', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        // action: {
        //   type: DataTypes.STRING,
        //   allowNull: false
        // },
        resource: {
          type: DataTypes.STRING,
          allowNull: false
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
      // Drop the permissions table
      await queryInterface.dropTable('Permissions');
}
import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('Payments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        paymentDate: {
            type: DataTypes.DATE, 
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT, 
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'), 
            allowNull: false
        },
        traineeId: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        }
    })
}

export async function down(queryInterface: QueryInterface): Promise<void>{

    await queryInterface.dropTable('Payments')
}
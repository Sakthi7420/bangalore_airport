import { QueryInterface, DataTypes, literal } from "sequelize";


export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('TaskModels', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        taskTitle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        taskDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE, 
            allowNull: false
        },
        trainerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        traineeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'overdue'),
            defaultValue: 'pending'
        },
        feedback: {
            type: DataTypes.TEXT, 
            allowNull: true 
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        }
    })
}

export async function down(queryInterface: QueryInterface): Promise<void>{
    await queryInterface.dropTable('TaskModels')
}
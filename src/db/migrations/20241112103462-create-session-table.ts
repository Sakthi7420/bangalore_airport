import { QueryInterface, DataTypes, literal } from "sequelize";


export async function up(queryInterface: QueryInterface): Promise<void>{

    await queryInterface.createTable('Sessions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        sessionTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sessionDate: {
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
        trainingPlanId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TrainingPlan',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        sessionLink: {
            type: DataTypes.STRING,
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

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('Sessions');
}
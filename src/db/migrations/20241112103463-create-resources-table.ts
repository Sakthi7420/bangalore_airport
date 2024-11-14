import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void>{

    await queryInterface.createTable('Resources', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        courseId: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'Course',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        resourceType: {
            type: DataTypes.ENUM('pdf', 'video', 'link'),
            allowNull: false,
        },
        resourceContent: {
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

    await queryInterface.dropTable('Resources')
}
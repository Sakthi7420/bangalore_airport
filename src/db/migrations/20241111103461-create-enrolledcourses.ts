import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void>{

    await queryInterface.createTable('EnrolledCourses', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        courseCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CourseCategory',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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
        enroll: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        enrollmentDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        enrollmentStatus: {
            type: DataTypes.ENUM('active', 'completed', 'inactive'),
            defaultValue: 'active',
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'), // OR Sequelize.fn('NOW')
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // OR Sequelize.fn('NOW')
          },
    })
}

export async function down(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.dropTable('EnrolledCourses')
}
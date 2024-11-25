import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('CourseDetails', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Courses',
                key: 'id'
            },

            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        courseLectures: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        courseQandA: {
            type: DataTypes.TEXT,
        },
        notes: {
            type: DataTypes.TEXT,
        },
        aboutCourse: {
            type: DataTypes.TEXT
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

    });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('CourseDetails');
}
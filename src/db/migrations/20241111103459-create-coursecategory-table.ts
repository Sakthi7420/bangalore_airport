import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('CourseCategories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        courseCategoryImg: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
    });

    await queryInterface.sequelize.query(`
        ALTER TABLE CourseCategories
        MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
        `);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    //drop the 'courseCategories' table
    await queryInterface.dropTable('CourseCategories');
}
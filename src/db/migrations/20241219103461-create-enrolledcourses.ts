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
        batchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Batch',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        enrollmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        enrollmentStatus: {
            type: DataTypes.ENUM('active', 'completed', 'inactive'),
            defaultValue: 'active',
            allowNull: false,
        },
        createdAt: {type: DataTypes.DATE, allowNull: false },
        updatedAt: {type: DataTypes.DATE, allowNull: false},
    });

    await queryInterface.sequelize.query(
        `ALTER TABLE EnrolledCourses
        MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
    `)
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    // delete a 'enrolledcourses' table
    await queryInterface.dropTable('EnrolledCourses')
}
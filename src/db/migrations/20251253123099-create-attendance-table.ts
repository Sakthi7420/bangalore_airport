import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('Attendances', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        batchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Batches',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Courses',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Modules',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Classes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        attendanceFileId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'AttendanceFiles',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attendance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamsRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstJoin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lastLeave: {
            type: DataTypes.DATE,
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
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.sequelize.query(
        `ALTER TABLE Attendaces
        MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;`
    )
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('Attendances');
}
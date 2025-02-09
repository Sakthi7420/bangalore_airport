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
        trainerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attendance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
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
        attendanceFile: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false }
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
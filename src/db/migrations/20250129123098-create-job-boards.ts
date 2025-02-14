import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('JobBoards', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CompanyInfos',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        jobRole: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobRoleDesc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        jobType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        jobLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    await queryInterface.sequelize.query(
        `ALTER TABLE JobBoards
        MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;`
    )
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('JobBoards');
}

import { QueryInterface, DataTypes, literal } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('CompanyInfos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        companyImg: {
            type: DataTypes.TEXT('long'),
            allowNull: true
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
            allowNull: false
        },
    });

    await queryInterface.sequelize.query(
        `ALTER TABLE CompanyInfos
        MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;`
    )
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('CompanyInfos');
}

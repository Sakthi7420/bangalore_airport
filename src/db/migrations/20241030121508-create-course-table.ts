import { QueryInterface, DataTypes, literal } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Create the 'Courses' table
  await queryInterface.createTable('Courses', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CourseCategory', // Referencing the 'CourseCategories' table
        key: 'id', // The referenced column
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    `ALTER TABLE Courses
    MODIFY createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;
`)
}  

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Drop the 'Courses' table
  await queryInterface.dropTable('Courses');
}
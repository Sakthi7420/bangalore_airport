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
    courseInstructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Referencing the 'Users' table (instructor)
        key: 'id', // The referenced column
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
  // Drop the 'Courses' table
  await queryInterface.dropTable('Courses');
}

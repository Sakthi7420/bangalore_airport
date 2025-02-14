import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Course } from './Courses';

@Table
export class CourseCategory extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  courseCategory!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;  // Optional field to add a description for each category

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseCategoryImg!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  updatedBy?: number;

  @HasMany(() => Course, { foreignKey: 'courseCategoryId' })
  courses!: Course[];

}

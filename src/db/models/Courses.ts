import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from './User';
import { CourseCategory } from './CourseCategory';

@Table
export class Course extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseDesc!: string;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseInstructorId!: number;

  @BelongsTo(() => CourseCategory, { as: 'category' })
  category!: CourseCategory;

  @BelongsTo(() => User)
  instructor!: User;
  CourseCategory: any;
  User: any;
  trainer: any;
};

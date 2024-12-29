import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CourseCategory } from './CourseCategory';
import { Batch } from './Batch';
import { EnrolledCourse } from './EnrolledCourses';
import { Module } from './Modules'
import { User } from './User';

@Table
export class Course extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseDesc!: string;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  // @ForeignKey(() => User)
  // @Column({ type: DataType.INTEGER, allowNull: false })
  // courseInstructorId!: number;

  @BelongsTo(() => CourseCategory, { as: 'category' })
  category!: CourseCategory;

  // @BelongsTo(() => User)
  // instructor!: User;
  // CourseCategory: any;
  // User: any;
  // trainer: any;

  @HasMany(() => Module)
  module!: Module[];

  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];

  @HasMany(() => Batch)
  batches!: Batch[]; 

};

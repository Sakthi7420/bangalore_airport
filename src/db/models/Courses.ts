import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CourseCategory } from './CourseCategory';
import { Batch } from './Batch';
import { EnrolledCourse } from './EnrolledCourses';
import { Module } from './Modules'
import { CourseAssignment } from './CourseAssignment';


@Table
export class Course extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseDesc!: string;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @Column({ type: DataType.TEXT('long'), allowNull: false })
  courseImg!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseLink!: string;

  @BelongsTo(() => CourseCategory, { as: 'category', foreignKey: 'courseCategoryId' })
  category!: CourseCategory;

  @HasMany(() => Module)
  module!: Module[];

  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];

  @HasMany(() => Batch)
  batches!: Batch[]; 

  @HasMany(() => CourseAssignment)
  courseAssignment!: CourseAssignment[];

};

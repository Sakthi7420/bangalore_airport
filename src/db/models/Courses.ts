import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CourseCategory } from './CourseCategory';
import { Batch } from './Batch';
import { EnrolledCourse } from './EnrolledCourses';
import { Module } from './Modules'
<<<<<<< HEAD
import { User } from './User';
=======
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa

@Table
export class Course extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseDesc!: string;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @BelongsTo(() => CourseCategory, { as: 'category', foreignKey: 'courseCategoryId' })
  category!: CourseCategory;

  @HasMany(() => Module)
  module!: Module[];

  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];

  @HasMany(() => Batch)
  batches!: Batch[]; 

<<<<<<< HEAD
};
=======
};
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa

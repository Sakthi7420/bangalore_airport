import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { CourseCategory } from './CourseCategory';
import { Course } from './Courses';

// @Table
// export class EnrolledCourse extends Model {
//   @ForeignKey(() => User)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   userId!: number;

//   @ForeignKey(() => CourseCategory)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseCategoryId!: number;

//   @ForeignKey(() => Course)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseId!: number;

//   @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
//   enroll!: boolean;

//   @Column({ type: DataType.DATE, allowNull: true })
//   enrollmentDate!: Date;

//   @BelongsTo(() => User)
//   user!: User;

//   @BelongsTo(() => Course)
//   course!: Course;
// }

@Table
export class EnrolledCourse extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  enroll!: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  enrollmentDate!: Date;

  @Column({
    type: DataType.ENUM('active', 'completed', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  })
  enrollmentStatus!: 'active' | 'completed' | 'inactive'; // New field to track enrollment status

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Course)
  course!: Course;
}

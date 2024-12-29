import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { CourseCategory } from './CourseCategory';
import { Course } from './Courses';
import { Batch } from './Batch';

@Table
export class EnrolledCourse extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number;

  @Column({ type: DataType.DATE, allowNull: true })
  enrollmentDate!: Date;

  @Column({
    type: DataType.ENUM('active', 'completed', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  })
  enrollmentStatus!: 'active' | 'completed' | 'inactive';

  @BelongsTo(() => User, { as: 'trainee' })
  user!: User;

  @BelongsTo(() => Course, { as: 'course' })
  course!: Course;

  @BelongsTo(() => Batch, { as: 'batch' })
  batch!: Batch;

}

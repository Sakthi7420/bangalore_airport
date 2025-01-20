import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Batch } from './Batch';
import { User } from './User';
import { Course } from './Courses';

@Table
export class CourseAssignment extends Model {
  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  courseAssignmentQuestionName!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseAssignmentQuestionFile!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: number;

  @BelongsTo(() => Batch, { as: 'batch', foreignKey: 'batchId' })
  batch!: Batch;

  @BelongsTo(() => Course, { as: 'course', foreignKey: 'courseId'})
  course!: Course;

  @BelongsTo(() => User, { as: 'trainer', foreignKey: 'trainerId' })
  trainer!: User;
}

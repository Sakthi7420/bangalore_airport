import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { Batch } from './Batch';
import { User } from './User';
import { Course } from './Courses';
import { AssignmentCompletion } from './AssignmentCompletion';
import { Class } from './Class';

@Table
export class CourseAssignment extends Model {
  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  courseAssignmentQuestionName!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseAssignmentQuestionFile!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalMarks!: number;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  assignStartDate?: Date;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  assignEndDate?: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  updatedBy?: number;

  @BelongsTo(() => Batch, { as: 'batch', foreignKey: 'batchId' })
  batch!: Batch;

  @BelongsTo(() => Course, { as: 'course', foreignKey: 'courseId' })
  course!: Course;

  @BelongsTo(() => User, { as: 'trainer', foreignKey: 'trainerId' })
  trainer!: User;

  @HasMany(() => AssignmentCompletion)
  assignmentCompletions!: AssignmentCompletion[];

  @HasMany(() => Class)
  classes!: Class[];
}
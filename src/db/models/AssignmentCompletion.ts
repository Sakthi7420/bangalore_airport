import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { User } from './User';
import { CourseAssignment } from './CourseAssignment';

@Table
export class AssignmentCompletion extends Model {
  @ForeignKey(() => CourseAssignment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseAssignId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  traineeId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalMarks!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  obtainedMarks!: number;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  assignStartDate?: Date;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  assignEndDate?: Date;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseAssignmentAnswerFile!: string;

  @BelongsTo(() => CourseAssignment, {
    as: 'CourseAssignment',
    foreignKey: 'courseAssignId'
  })
  courseAssignment!: CourseAssignment;

  @BelongsTo(() => User)
  trainee!: User;
}


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

  @Column({ type: DataType.FLOAT, allowNull: false })
  obtainedMarks!: number;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseAssignmentAnswerFile!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  updatedBy?: number;

  @BelongsTo(() => CourseAssignment, {
    as: 'courseAssignments',
    foreignKey: 'courseAssignId'
  })
  courseAssignment!: CourseAssignment;

  @BelongsTo(() => User, { as: 'trainee', foreignKey: 'traineeId' })
  trainee!: User;
}


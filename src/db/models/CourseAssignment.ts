import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Batch } from './Batch';
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { User } from './User';

@Table
export class CourseAssignment extends Model {
  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number;

  @ForeignKey(() => BatchModuleSchedules)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchModuleScheduleId!: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  courseAssignmentQuestionName!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseAssignmentQuestionFile!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  instructorId!: number;

  @BelongsTo(() => Batch, { as: 'batch', foreignKey: 'batchId' })
  batch!: Batch;

  @BelongsTo(() => BatchModuleSchedules, {
    as: 'batchmoduleschedule',
    foreignKey: 'batchModuleScheduleId'
  })
  batchModuleSchedule!: BatchModuleSchedules;

  @BelongsTo(() => User)
  trainer!: User;
}

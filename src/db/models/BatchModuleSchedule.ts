import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import { Batch } from './Batch';
import { User } from './User';
import { Module } from './Modules';
import { CourseAssignment } from './CourseAssignment';
import { BatchTrainer } from './BatchTrainer'; // Ensure this model exists and is properly defined

@Table
export class BatchModuleSchedules extends Model {
  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number;

  @ForeignKey(() => Module)
  @Column({ type: DataType.INTEGER, allowNull: false })
  moduleId!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  startDate!: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  startTime!: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  endDate!: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  endTime!: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  meetingLink!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration!: number;

  // Many-to-Many relationship with User via BatchTrainee
  @BelongsToMany(() => User, () => BatchTrainer)
  trainers!: User[];

  // Optional direct relationship with BatchTrainee for querying join table
  @HasMany(() => BatchTrainer)
  batchTrainer!: BatchTrainer[];

  @BelongsTo(() => Batch, { as: 'batch'})
  batch!: Batch;

  @BelongsTo(() => Module, {as: 'module'})
  module!: Module;
}

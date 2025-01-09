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

  @Column({ type: DataType.DATE, allowNull: false })
  scheduleDateTime!: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration!: number;

  // Many-to-Many relationship with User via BatchTrainee
  @BelongsToMany(() => User, () => BatchTrainer)
  trainer!: User[];

  // Optional direct relationship with BatchTrainee for querying join table
  @HasMany(() => BatchTrainer)
  batchTrainer!: BatchTrainer[];

  @BelongsTo(() => Batch)
  batch!: Batch;

  @BelongsTo(() => Module)
  module!: Module;

  @HasMany(() => CourseAssignment)
  courseAssignment!: CourseAssignment[];
}

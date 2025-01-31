import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { User } from './User';

@Table
export class BatchTrainer extends Model {
  @ForeignKey(() => BatchModuleSchedules)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchModuleScheduleId!: number; // Foreign key referencing Role

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: string; // Foreign key referencing Permission

  @BelongsTo(() => BatchModuleSchedules)
  batchModuleSchedule!: BatchModuleSchedules;

  @BelongsTo(() => User)
  user!: User;
}

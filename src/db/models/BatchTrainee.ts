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

@Table
export class BatchTrainee extends Model {
  @ForeignKey(() => Batch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  batchId!: number; // Foreign key referencing Role

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  traineeId!: string; // Foreign key referencing Permission

  @BelongsTo(() => Batch)
  batch!: Batch;

  @BelongsTo(() => User)
  user!: User;
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { JobBoard } from './JobBoard';

@Table
export class UserSavedJobs extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number; // Foreign key referencing Role

  @ForeignKey(() => JobBoard)
  @Column({ type: DataType.INTEGER, allowNull: false })
  jobBoardId!: number; // Foreign key referencing Permission

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => JobBoard)
  jobBoard!: JobBoard;
}

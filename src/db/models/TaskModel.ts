import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Task extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  taskTitle!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  taskDescription!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  dueDate!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  traineeId!: number;

  @Column({ type: DataType.ENUM('pending', 'completed', 'overdue'), 
    defaultValue: 'pending' 
  })
  status!: 'pending' | 'completed' | 'overdue';

  @Column({ type: DataType.TEXT, allowNull: true })
  feedback!: string;

  @BelongsTo(() => User, 'trainerId')
  trainer!: User;  // The trainer who assigned the task

  @BelongsTo(() => User, 'traineeId')
  trainee!: User;  // The trainee who is assigned the task
}

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class TrainingPlan extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  trainingName!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: number;

  @Column({ type: DataType.ENUM('active', 'inactive'),
  defaultValue: 'active' })
  status!: 'active' | 'inactive';

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  assignedTo!: number;  // References the User model (trainee)

  @Column({ type: DataType.DATE, allowNull: false })
  startDate!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  endDate!: Date;

  @BelongsTo(() => User, { foreignKey: 'assignedTo', as: 'trainee' })
  trainee!: User;  
  
  @BelongsTo(() => User, { foreignKey: 'trainerId', as: 'trainer' })
  trainer!: User;
}

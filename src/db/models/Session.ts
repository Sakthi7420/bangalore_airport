import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { TrainingPlan } from './TrainingPlan';

@Table
export class Session extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  sessionTitle!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  sessionDate!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainerId!: number;

  @ForeignKey(() => TrainingPlan)
  @Column({ type: DataType.INTEGER, allowNull: false })
  trainingPlanId!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  sessionLink!: string;  // Teams/Zoom meeting link

  @BelongsTo(() => User)
  trainer!: User;  // The trainer conducting the session

  @BelongsTo(() => TrainingPlan)
  trainingPlan!: TrainingPlan;  // The training plan associated with this session
}

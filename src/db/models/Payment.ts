import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Payment extends Model {
  @Column({ type: DataType.DATE, allowNull: false })
  paymentDate!: Date;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount!: number;

  @Column({ type: DataType.ENUM('pending', 'completed', 'failed'), allowNull: false })
  status!: 'pending' | 'completed' | 'failed';

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  traineeId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  paymentMethod!: string;  // E.g., "credit card", "bank transfer"

  @BelongsTo(() => User)
  trainee!: User;  // The trainee who made the payment
}

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Permission extends Model {
  @Column({
    type: DataType.ENUM('trainee', 'trainer', 'admin'),
    allowNull: false,
  })
  role!: 'trainee' | 'trainer' | 'admin';

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  resourceAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  courseAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  taskAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  sessionAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  paymentAccess!: boolean;
}

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Permission extends Model {
  // The role of the user, can be 'trainee', 'trainer', or 'admin'.
  @Column({
    type: DataType.ENUM('trainee', 'trainer', 'admin'),
    allowNull: false,
  })
  role!: 'trainee' | 'trainer' | 'admin';

  // Boolean flag indicating access to resources
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  resourceAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  courseAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  taskAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  sessionAccess!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  paymentAccess!: boolean;

  // Timestamps for auditing purposes
  @Column({ type: DataType.DATE, allowNull: true })
  createdAt!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt!: Date;
}

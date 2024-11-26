import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { RolePermission } from './RolePermission';


@Table
export class Permission extends Model {
  // @Column({ type: DataType.STRING, allowNull: false })
  // action!: string; // The action that the permission allows

  @Column({ type: DataType.STRING, allowNull: false })
  resource!: string; // The resource that the permission applies to

  //Audit table
  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number; // User who created the permission

  @Column({ type: DataType.INTEGER, allowNull: true })
  updatedBy?: number; // User who last updated the permission

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt!: Date; // Timestamp when the permission was created

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updatedAt!: Date; // Timestamp when the permission was last updated

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[]; // Relationship to role permissions
}


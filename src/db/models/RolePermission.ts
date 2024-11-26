import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Role } from './Role';
import { Permission } from './Permission';

@Table
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number; // Foreign key referencing Role

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  permissionId!: number; // Foreign key referencing Permission

  // Association with Role
  @BelongsTo(() => Role)
  role!: Role;

  // Association with Permission
  @BelongsTo(() => Permission)
  permission!: Permission;
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';

import { EnrolledCourse } from './EnrolledCourses'; // Ensure the correct path to EnrolledCourse model
import { Role } from './Role';


@Table
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;
  
  @Column({ type: DataType.DATE, allowNull: true })
  dateOfBirth?: Date;

  @Column({ type: DataType.STRING, allowNull: true }) 
  phoneNumber?: string;

  @Column({ type: DataType.STRING, allowNull: false})
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  qualification?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  profilePic?: string;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  dateOfJoining?: Date;

  @Column({ type: DataType.ENUM('active', 'suspended', 'inactive'), allowNull: false, defaultValue: 'active' })
  accountStatus!: 'active' | 'suspended' | 'inactive';

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogin?: Date;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number;  // Foreign key for Role

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];

}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Course } from './Courses'; // Assuming the Course model is in the same directory
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { User } from './User';

@Table
export class Module extends Model {

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number; // User who created the Module

  @Column({ type: DataType.STRING, allowNull: false })
  moduleName!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  moduleDescription?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  sequence!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  recordedLink!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  materialForModule!: string;

  @BelongsTo(() => Course)
  course!: Course;

  @BelongsTo(() => User, { as: 'user', foreignKey: 'createdBy' })
  user!: User;

  @HasMany(() => BatchModuleSchedules)
  batchModuleSchedules!: BatchModuleSchedules[];
}
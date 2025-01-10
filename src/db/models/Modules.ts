import {
<<<<<<< HEAD
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from 'sequelize-typescript';
  import { Course } from './Courses'; // Assuming the Course model is in the same directory
import { BatchModuleSchedules } from './BatchModuleSchedules';
  
  @Table
  export class Module extends Model {

    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER, allowNull: false })
    courseId!: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    moduleName!: string;
  
    @Column({ type: DataType.TEXT, allowNull: true })
    moduleDescription?: string;
  
    @Column({ type: DataType.INTEGER, allowNull: true })
    sequence!: number;

    @BelongsTo(() => Course)
    course!: Course;

    @HasMany(() => BatchModuleSchedules)
    batchModuleSchedules!: BatchModuleSchedules[];
=======
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import { Course } from './Courses'; // Assuming the Course model is in the same directory
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { User } from './User';

@Table
export class Module extends Model {

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  moduleName!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  moduleDescription?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  sequence!: number;

  @BelongsTo(() => Course)
  course!: Course;

  @HasMany(() => BatchModuleSchedules)
  batchModuleSchedules!: BatchModuleSchedules[];
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa
}
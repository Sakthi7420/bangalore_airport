import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { Course } from './Courses'; // Assuming the Course model is in the same directory
  import { User } from './User'; // Assuming the User model is in the same directory
  
  @Table
  export class Module extends Model {
    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER, allowNull: false })
    courseId!: number;
  
    @BelongsTo(() => Course)
    course!: Course;
  
    @Column({ type: DataType.STRING, allowNull: false })
    moduleName!: string;
  
    @Column({ type: DataType.TEXT, allowNull: true })
    moduleDescription?: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    sequence!: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    createdBy!: number;
  
    @BelongsTo(() => User, 'createdBy')
    creator!: User;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    updatedBy?: number;
  
    @BelongsTo(() => User, 'updatedBy')
    updater?: User;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  
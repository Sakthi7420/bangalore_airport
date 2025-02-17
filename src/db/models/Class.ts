import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany
  } from 'sequelize-typescript';
  
  import { CourseAssignment } from './CourseAssignment';
  import { Module } from './Modules';
import { Attendance } from './Attendance';
  
  @Table
  export class Class extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    classTitle!: string;
  
    @Column({ type: DataType.TEXT, allowNull: true })
    classDescription!: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    classRecordedLink!: string;
  
    @ForeignKey(() => CourseAssignment)
    @Column({ type: DataType.INTEGER, allowNull: false })
    assignmentId!: number;
  
    @ForeignKey(() => Module)
    @Column({ type: DataType.INTEGER, allowNull: false })
    moduleId!: number;
  
    @Column({ type: DataType.DATEONLY, allowNull: false })
    classDate!: Date;
  
    @Column({ type: DataType.TEXT('long'), allowNull: true })
    materialForClass!: string;
  
    @BelongsTo(() => CourseAssignment, {
      as: 'courseAssignments',
      foreignKey: 'assignmentId'
    })
    courseAssignment!: CourseAssignment;
  
    @BelongsTo(() => Module, { as: 'module' })
    module!: Module;

    @HasMany(() => Attendance)
    attendance!: Attendance;
  }
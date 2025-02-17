import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import { Module } from './Modules';
import { Batch } from './Batch';
import { AttendanceFile } from './AttendanceFile';
import { Course } from './Courses';
import { Class } from './Class';

@Table
export class Attendance extends Model {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Batch)
    @Column({ type: DataType.INTEGER, allowNull: false })
    batchId!: number;

    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER, allowNull: false })
    courseId!: number;

    @ForeignKey(() => Module)
    @Column({ type: DataType.INTEGER, allowNull: false })
    moduleId!: number;

    @ForeignKey(() => AttendanceFile)
    @Column({ type: DataType.INTEGER, allowNull: false })
    attendanceFileId!: number;

    @ForeignKey(() => Class)
    @Column({ type: DataType.INTEGER, allowNull: false })
    classId!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    teamsRole!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstJoin?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastLeave?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    duration!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    attendance!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    percentage!: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    createdBy?: number;

    @Column({ type: DataType.INTEGER, allowNull: true })
    updatedBy?: number;

    @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    user!: User;

    @BelongsTo(() => Batch, { as: 'batch', foreignKey: 'batchId' })
    batch!: Batch;

    @BelongsTo(() => Module, { as: 'module', foreignKey: 'moduleId' })
    module!: Module;

    @BelongsTo(() => Course, { as: 'course', foreignKey: 'courseId' })
    course!: Course;

    @BelongsTo(() => Class, { as: 'class', foreignKey: 'classId' })
    class!: Class;

    @BelongsTo(() => AttendanceFile, { as: 'attendanceFile', foreignKey: 'attendanceFileId' })
    attendanceFile!: AttendanceFile;
}


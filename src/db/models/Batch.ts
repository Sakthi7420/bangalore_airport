import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User } from './User';
import { Course } from './Courses';
import { EnrolledCourse } from './EnrolledCourses';
import { BatchModuleSchedules } from './BatchModuleSchedules';

@Table
export class Batch extends Model {

    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER, allowNull: false })
    courseId!:number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true, })
    batchName!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    startDate!: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    endDate!: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    traineeId!: number;

    @BelongsTo(() => User, { as: 'trainee'})
    trainee!: User;

    @BelongsTo(() => Course, { as: 'course'})
    course!: Course;

    @HasMany(() => EnrolledCourse)
    enrolledCourses!: EnrolledCourse[];

    @HasMany(() => BatchModuleSchedules)
    batchModuleSchedules!: BatchModuleSchedules[];
}
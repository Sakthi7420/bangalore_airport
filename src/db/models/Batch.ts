import {
<<<<<<< HEAD
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
=======
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa
} from 'sequelize-typescript';
import { User } from './User';
import { Course } from './Courses';
import { EnrolledCourse } from './EnrolledCourses';
<<<<<<< HEAD
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
=======
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { CourseAssignment } from './CourseAssignment';
import { BatchTrainee } from './BatchTrainee'; // Ensure this model exists and is properly defined

@Table
export class Batch extends Model {
  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  batchName!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  endDate!: Date;

  // Many-to-Many relationship with User via BatchTrainee
  @BelongsToMany(() => User, () => BatchTrainee)
  trainees!: User[];

  // Optional direct relationship with BatchTrainee for querying join table
  @HasMany(() => BatchTrainee)
  batchTrainees!: BatchTrainee[];

  // Define the course relationship
  @BelongsTo(() => Course)
  course!: Course;

  // Define enrolled courses relationship
  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];

  // Define batch module schedules relationship
  @HasMany(() => BatchModuleSchedules)
  batchModuleSchedules!: BatchModuleSchedules[];

  // Define course assignments relationship
  @HasMany(() => CourseAssignment)
  courseAssignments!: CourseAssignment[];
}
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa

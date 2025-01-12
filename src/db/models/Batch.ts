import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { BatchModuleSchedules } from './BatchModuleSchedule';
import { CourseAssignment } from './CourseAssignment';
import { BatchTrainee } from './BatchTrainee'; // Ensure this model exists and is properly defined
import { Course } from './Courses';
import { User } from './User';
import { EnrolledCourse } from './EnrolledCourses';

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
  @BelongsTo(() => Course, { as: 'course'})
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
};
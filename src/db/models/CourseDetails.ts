import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Course } from './Courses';
import { CourseCategory } from './CourseCategory';

// @Table
// export class CourseDetail extends Model {
//   @ForeignKey(() => Course)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseId!: number;

//   @Column({ type: DataType.TEXT })
//   courseLectures!: string;

//   @Column({ type: DataType.TEXT })
//   courseQandA!: string;

//   @Column({ type: DataType.TEXT })
//   notes!: string;

//   @Column({ type: DataType.TEXT })
//   aboutCourse!: string;
// }


@Table
export class CourseDetail extends Model {
  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  courseLectures!: string;

  @Column({ type: DataType.TEXT })
  courseQandA!: string;

  @Column({ type: DataType.TEXT })
  notes!: string;

  @Column({ type: DataType.TEXT })
  aboutCourse!: string;

  @BelongsTo(() => Course, { foreignKey: 'courseId', as: 'course' })
  course!: Course; // Ensure it's linked to the course

  @BelongsTo(() => CourseCategory, { foreignKey: 'courseCategoryId', as: 'courseCategory' })
  courseCategory!: CourseCategory;
}

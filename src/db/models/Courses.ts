import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from './User';
import { CourseCategory } from './CourseCategory';

// @Table
// export class Course extends Model {
//   @Column({ type: DataType.STRING, allowNull: false })
//   courseName!: string;

//   @ForeignKey(() => CourseCategory)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseCategoryId!: number;

//   @ForeignKey(() => User)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseInstructorId!: number;

//   @BelongsTo(() => CourseCategory)
//   category!: CourseCategory;

//   @BelongsTo(() => User)
//   instructor!: User;
// }


@Table
export class Course extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING, allowNull: false})
  courseDesc!: string;

  @ForeignKey(() => CourseCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseCategoryId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseInstructorId!: number;

  @BelongsTo(() => CourseCategory)
  category!: CourseCategory;

  @BelongsTo(() => User)
  instructor!: User;
}

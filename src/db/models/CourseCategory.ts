import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Course } from './Courses'; // Ensure the path to the Course model is correct

// @Table
// export class CourseCategory extends Model {
//   @Column({ type: DataType.STRING, allowNull: false })
//   courseCategory!: string;

//   @Column({ type: DataType.BLOB, allowNull: true })
//   courseCategoryImg!: Buffer;

//   @HasMany(() => Course)
//   courses!: Course[];
// }


@Table
export class CourseCategory extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  courseCategory!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;  // Optional field to add a description for each category

  @Column({ type: DataType.STRING, allowNull: true })
  courseCategoryImg!: string;

  @HasMany(() => Course)
  courses!: Course[];
}

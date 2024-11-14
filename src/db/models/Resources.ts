// import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
// import { Course } from './Courses';

// @Table
// export class Resource extends Model {
//   @ForeignKey(() => Course)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   courseId!: number;

//   @Column({
//     type: DataType.ENUM('pdf', 'video', 'link'),
//     allowNull: false,
//   })
//   resourceType!: 'pdf' | 'video' | 'link';

//   @Column({ type: DataType.TEXT, allowNull: false })
//   resourceContent!: string;

//   @Column({ type: DataType.STRING, allowNull: true })
//   description!: string;
// }


import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Course } from './Courses';

@Table
export class Resource extends Model {
  // Foreign key to Course model
  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  // Relation to the Course model
  @BelongsTo(() => Course)
  course!: Course;

  // Resource type can be pdf, video, or link
  @Column({
    type: DataType.ENUM('pdf', 'video', 'link'),
    allowNull: false,
  })
  resourceType!: 'pdf' | 'video' | 'link';

  // Content of the resource (could be a URL, file path, or text)
  @Column({ type: DataType.TEXT, allowNull: false })
  resourceContent!: string;

  // Optional description of the resource
  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  // Optional timestamps to track creation and update
  @Column({ type: DataType.DATE, allowNull: true })
  createdAt!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt!: Date;
}

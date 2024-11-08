import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Course } from './Courses';

@Table
export class Resource extends Model {
  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @Column({
    type: DataType.ENUM('pdf', 'video', 'link'),
    allowNull: false,
  })
  resourceType!: 'pdf' | 'video' | 'link';

  @Column({ type: DataType.TEXT, allowNull: false })
  resourceContent!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description!: string;
}

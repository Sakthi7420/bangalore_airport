import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
<<<<<<< HEAD
=======

>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa
import { Course } from './Courses'; 

@Table
export class CourseCategory extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  courseCategory!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;  // Optional field to add a description for each category

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  courseCategoryImg!: string;

  @HasMany(() => Course, { foreignKey: 'courseCategoryId' })
  courses!: Course[];

<<<<<<< HEAD
}
=======
}
>>>>>>> 51c922ad30af98be46f427517bc237f5862b68aa

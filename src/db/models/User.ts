import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import { EnrolledCourse } from './EnrolledCourses'; // Ensure the correct path to EnrolledCourse model

// @Table
// export class User extends Model {
//   @Column({ type: DataType.STRING, allowNull: false })
//   name!: string; // User's name

//   @Column({ type: DataType.STRING, allowNull: false, unique: true })
//   email!: string; // User's email

//   @Column({ type: DataType.STRING, allowNull: false })
//   password!: string; // User's password

//   @Column({
//     type: DataType.ENUM('trainee', 'trainer', 'admin'),
//     allowNull: false,
//     defaultValue: 'trainee',
//   })
//   role!: 'trainee' | 'trainer' | 'admin';


//   // @Column({ type: DataType.BLOB, allowNull: true })
//   // profilePic?: Buffer; // User's profile picture as a BLOB

//   @Column({ type: DataType.STRING, allowNull: true })
//   phoneNumber?: string; // User's phone number

//   // @Column({ type: DataType.STRING, allowNull: true })
//   // destination?: string; // User's destination

//   @Column({ type: DataType.STRING, allowNull: true })
//   department!: number; // Foreign key for Department

//   // @Column({ type: DataType.DATE, allowNull: true })
//   // dateOfJoining?: Date; // Date of joining

//   // @Column({ type: DataType.STRING, allowNull: true })
//   // position?: string; // User's position

//   // Audit fields
//   // @Column({ type: DataType.INTEGER, allowNull: true })
//   // createdBy?: number; // User ID who created this record

//   // @Column({ type: DataType.INTEGER, allowNull: true })
//   // updatedBy?: number; // User ID who last updated this record

//   @HasMany(() => EnrolledCourse)
//   enrolledCourses!: EnrolledCourse[];
// }


@Table
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;
  
  @Column({ type: DataType.DATE, allowNull: true })
  dateOfBirth?: Date;

  @Column({ type: DataType.STRING, allowNull: true }) 
  phoneNumber?: string;

  @Column({ type: DataType.STRING, allowNull: false})
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  qualification?: string;

  @Column({ type: DataType.BLOB, allowNull: true })
  profilePic!: Buffer;

  @Column({ type: DataType.DATE, allowNull: true })
  dateOfJoining?: Date; 

  @Column({ type: DataType.ENUM('trainee', 'trainer', 'admin', 'sales'),
  allowNull: false,
  defaultValue: 'trainee',
  })
  role!: 'trainee' | 'trainer' | 'admin' | 'sales';

  @Column({ type: DataType.ENUM('active', 'suspended', 'inactive'), allowNull: false, defaultValue: 'active' })
  accountStatus!: 'active' | 'suspended' | 'inactive';

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogin?: Date;

  @HasMany(() => EnrolledCourse)
  enrolledCourses!: EnrolledCourse[];
}

import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { Attendance } from './Attendance';

@Table 
export class AttendanceFile extends Model {

    @Column({ type: DataType.TEXT('long'), allowNull:false })
    teamsAttendanceFile!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    attendanceDate!: Date;

    @Column({ type: DataType.INTEGER, allowNull: true })
    createdBy?: number;

    @Column({ type: DataType.INTEGER, allowNull: true })
    updatedBy?: number;

    @HasMany(() => Attendance)
    attendance!: Attendance[];

}
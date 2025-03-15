import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';


@Table

export class EmployeeTable extends Model {

  @Column({ type: DataType.STRING, allowNull: false })
  Employee_Name!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  Score!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  Result!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: false })
  Certificate!: string;


}


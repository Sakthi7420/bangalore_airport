import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table

export class Employee extends Model {

  @Column({ type: DataType.STRING, allowNull: false })
  employee_Name!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  score!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  result!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: false })
  certificate!: string;


}


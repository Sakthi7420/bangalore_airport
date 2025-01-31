import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { JobBoard } from './JobBoard';

@Table
export class CompanyInfo extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  companyName!: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  companyImg!: string;

  @HasMany(() => JobBoard, { foreignKey: 'companyId' })
  jobBoard!: JobBoard[];
}

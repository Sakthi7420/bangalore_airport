import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { CompanyInfo } from './CompanyInfo';

@Table
export class JobBoard extends Model {
  @ForeignKey(() => CompanyInfo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  companyId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  jobRole!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  jobRoleDesc!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  jobType!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  jobLocation!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  experience!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  salary!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  jobLink!: string;
  
  @Column({ type: DataType.INTEGER, allowNull: true })
  createdBy?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  updatedBy?: number;

  @BelongsTo(() => CompanyInfo, { as: 'companyInfo', foreignKey: 'companyId' })
  company!: CompanyInfo;
}

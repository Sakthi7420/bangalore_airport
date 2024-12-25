import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  PrimaryKey,
  Unique
} from 'sequelize-typescript';

@Table
export class Batch extends Model {
  @Column({ type: DataType.STRING, allowNull: false ,unique: true,})
  batchName!: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  shiftTime!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  endDate!: Date;
}

import { INTEGER } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import { Module } from './Modules';
import { Batch } from './Batch';

@Table 
export class Attendance extends Model {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Batch)
    @Column({ type: DataType.INTEGER, allowNull: false })
    batchId!: number;

    @ForeignKey(() => Module)
    @Column({ type: DataType.INTEGER, allowNull: false })
    moduleId!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    trainerId!: number;
    
    @Column({ type: DataType.STRING, allowNull: false })
    role!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    duration!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstJoin?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastLeave?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    attendance!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email!: string;

    @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    user!: User;

    @BelongsTo(() => Batch, { as: 'batch', foreignKey: 'batchId' })
    batch!: Batch;

    @BelongsTo(() => Module, { as: 'module', foreignKey: 'moduleId'})
    module!: Module;

    @BelongsTo(() => User, { as: 'trainer', foreignKey: 'trainerId' })
    trainer!: User;
}


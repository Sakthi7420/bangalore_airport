import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Batch } from './Batch';
import { User } from './User';
import { Module } from './Modules';

@Table
export class BatchModuleSchedules extends Model {

    @ForeignKey(() => Batch)
    @Column({ type: DataType.INTEGER, allowNull: false })
    batchId!: number;

    @ForeignKey(() => Module)
    @Column({ type: DataType.INTEGER, allowNull: false })
    moduleId!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    trainerIds!: number;

    @Column({ type: DataType.DATE, allowNull: false })
    scheduleDateTime!: Date;

    @Column({ type: DataType.INTEGER, allowNull: false })
    duration!: number;

    @BelongsTo(() => User, { as: 'user'} )
    user!: User;

    @BelongsTo(() => Batch)
    batch!: Batch;

    @BelongsTo(() => Module)
    module!: Module;
}
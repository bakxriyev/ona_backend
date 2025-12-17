import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { DirectionDoctors } from "../../direction_doctors/model/direction_doctor.entity";


@Table({ tableName: 'direction', timestamps: true })
export class Direction extends Model<Direction> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column({ type: DataType.STRING, allowNull: true })
full_name?: string;


@Column({ type: DataType.STRING, allowNull: true })
title?: string;


@Column({ type: DataType.STRING, allowNull: true })
description?: string;


@Column({ type: DataType.STRING, allowNull: true })
photo?: string;


@Column({ type: DataType.STRING, allowNull: true })
video?: string;


@Column({ type: DataType.STRING, allowNull: true })
title_ru?: string;


@Column({ type: DataType.STRING, allowNull: true })
description_ru?: string;


@HasMany(() => DirectionDoctors)
directionDoctors?: DirectionDoctors[];
}
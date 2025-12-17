import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Doctor } from "../../doctors/model/doctor.entity";
import { Direction } from "../../direction/model/direction.entity";


@Table({ tableName: 'direction_doctors', timestamps: false })
export class DirectionDoctors extends Model<DirectionDoctors> {


@ForeignKey(() => Doctor)
@Column({ type: DataType.BIGINT, allowNull: true })
doctors_id?: number;


@ForeignKey(() => Direction)
@Column({ type: DataType.BIGINT, allowNull: true })
direction_id?: number;


@BelongsTo(() => Doctor)
doctor?: Doctor;


@BelongsTo(() => Direction)
direction?: Direction;
}
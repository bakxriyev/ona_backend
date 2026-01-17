import { Table, Column, Model, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { DirectionDoctors } from "../../direction_doctors/model/direction_doctor.entity";


@Table({ tableName: 'doctors', timestamps: true })
export class Doctor extends Model<Doctor> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column({ type: DataType.STRING, allowNull: true })
first_name?: string;


@Column({ type: DataType.STRING, allowNull: true })
last_name?: string;


@Column({ type: DataType.BIGINT, allowNull: true })
age?: number;


@Column({ type: DataType.STRING, allowNull: true })
photo?: string;


@Column({ type: DataType.STRING, allowNull: true })
video?: string;


@Column({ type: DataType.STRING, allowNull: true })
staji?: string;


@Column({ type: DataType.STRING, allowNull: true })
education?: string;


@Column({ type: DataType.STRING, allowNull: true })
specialization?: string;


@Column({ type: DataType.STRING, allowNull: true })
staji_ru?: string;


@Column({ type: DataType.STRING, allowNull: true })
education_ru?: string;


@Column({ type: DataType.STRING, allowNull: true })
specialization_ru?: string;


@HasMany(() => DirectionDoctors)
directionDoctors?: DirectionDoctors[];
}
import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'resume', timestamps: true })
export class Resume extends Model<Resume> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.STRING) full_name?: string;
@Column(DataType.STRING) birth_date?: string;
@Column(DataType.STRING) phone_number?: string;
@Column(DataType.STRING) gmail?: string;
@Column(DataType.STRING) maosh?: string;
@Column(DataType.STRING) lavozim?: string;
@Column(DataType.STRING) photo?: string;
@Column(DataType.STRING) about_us?: string;
}
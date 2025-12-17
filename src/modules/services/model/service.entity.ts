import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'services', timestamps: true })
export class Service extends Model<Service> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.BIGINT) full_name?: number;
@Column(DataType.BIGINT) description?: number;
@Column(DataType.BIGINT) description_ru?: number;
@Column(DataType.STRING) title?: string;
@Column(DataType.STRING) title_ru?: string;
@Column(DataType.STRING) full_name_ru?: string;
@Column(DataType.STRING) photo?: string;
@Column(DataType.STRING) video?: string;
@Column(DataType.STRING) about?: string;
}
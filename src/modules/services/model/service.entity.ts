import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'services', timestamps: true })
export class Service extends Model<Service> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.TEXT) full_name?: string;
@Column(DataType.TEXT) description?: string;
@Column(DataType.TEXT) description_ru?: string;
@Column(DataType.TEXT) title?: string;
@Column(DataType.TEXT) title_ru?: string;
@Column(DataType.TEXT) full_name_ru?: string;
@Column(DataType.TEXT) photo?: string;
@Column(DataType.TEXT) video?: string;
@Column(DataType.TEXT) about?: string;
}
import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'careers', timestamps: true })
export class Career extends Model<Career> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.STRING) description?: string;
@Column(DataType.STRING) description_ru?: string;
@Column(DataType.STRING) title?: string;
@Column(DataType.STRING) title_ru?: string;
@Column(DataType.STRING) vacancy?: string;
}
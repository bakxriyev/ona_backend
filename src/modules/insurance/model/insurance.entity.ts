import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'insurance', timestamps: true })
export class Insurance extends Model<Insurance> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.TEXT) full_name?: string;
@Column(DataType.TEXT) title?: string;
@Column(DataType.TEXT) description?: string;
@Column(DataType.TEXT) photo?: string;
@Column(DataType.TEXT) video?: string;
@Column(DataType.TEXT) about_insurance?: string;
@Column(DataType.TEXT) title_ru?: string;
@Column(DataType.TEXT) description_ru?: string;
@Column(DataType.TEXT) about_insurance_ru?: string;
}
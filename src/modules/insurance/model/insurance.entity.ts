import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'insurance', timestamps: true })
export class Insurance extends Model<Insurance> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column(DataType.BIGINT) full_name?: number;
@Column(DataType.STRING) title?: string;
@Column(DataType.BIGINT) description?: number;
@Column(DataType.STRING) photo?: string;
@Column(DataType.STRING) video?: string;
@Column(DataType.STRING) about_insurance?: string;
@Column(DataType.STRING) title_ru?: string;
@Column(DataType.STRING) description_ru?: string;
@Column(DataType.STRING) about_insurance_ru?: string;
}
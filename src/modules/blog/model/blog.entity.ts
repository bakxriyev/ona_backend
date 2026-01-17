import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: 'blog', timestamps: true })
export class Blog extends Model<Blog> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;
@Column(DataType.STRING) description?: string;
@Column(DataType.STRING) title?: string;
@Column(DataType.STRING) description_ru?: string;
@Column(DataType.STRING) title_ru?: string;
@Column(DataType.STRING) video?: string;
@Column(DataType.STRING) photo?: string;
@Column(DataType.STRING) maqola?: string;
}

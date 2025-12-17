import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'news', timestamps: true })
export class News extends Model<News> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column({ type: DataType.STRING, allowNull: true }) photo?: string;
@Column({ type: DataType.STRING, allowNull: true }) description?: string;
@Column({ type: DataType.STRING, allowNull: true }) title?: string;
@Column({ type: DataType.STRING, allowNull: true }) video?: string;
@Column({ type: DataType.BIGINT, allowNull: true }) matn?: string;
@Column({ type: DataType.STRING, allowNull: true }) description_ru?: string;
@Column({ type: DataType.STRING, allowNull: true }) title_ru?: string;
@Column({ type: DataType.STRING, allowNull: true }) matn_ru?: string;
@Column({ type: DataType.STRING, allowNull: true }) date?: string;
}
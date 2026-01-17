import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'about', timestamps: true })
export class About extends Model<About> {
    @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
    id: number;


    @Column(DataType.STRING) full_name?: string;
    @Column(DataType.STRING) description?: string;
    @Column(DataType.STRING) title?: string;
    @Column(DataType.STRING) description_ru?: string;
    @Column(DataType.STRING) title_ru?: string;
    @Column(DataType.STRING) logo?: string;
    @Column(DataType.STRING) gmail?: string;
    @Column(DataType.STRING) manzil?: string;
    @Column(DataType.STRING) manzil_ru?: string;
}
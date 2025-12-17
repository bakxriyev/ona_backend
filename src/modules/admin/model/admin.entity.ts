import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'admin', timestamps: true })
export class Admin extends Model<Admin> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;
@Column({ type: DataType.STRING, allowNull: true })
full_name?: string;
@Column({ type: DataType.STRING, allowNull: true })
email?: string;
@Column({ type: DataType.BIGINT, allowNull: true })
phone_number?: number;
@Column({ type: DataType.STRING, allowNull: true })
username?: string;
@Column({ type: DataType.STRING, allowNull: true })
password?: string;

@Column({ type: DataType.STRING, allowNull: true })
role?: string;

}

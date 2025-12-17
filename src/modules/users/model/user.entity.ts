import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
@Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
id: number;


@Column({ type: DataType.STRING, allowNull: true })
full_name?: string;


@Column({ type: DataType.BIGINT, allowNull: true })
phone_number?: number;


@Column({ type: DataType.STRING, allowNull: true })
photo?: string;
}
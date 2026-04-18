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

@Column({ type: DataType.STRING, allowNull: false })
department: string;

@Column({ type: DataType.STRING, allowNull: true })
doctor_name?: string;

@Column({ type: DataType.TEXT, allowNull: true })
message?: string;

@Column({ type: DataType.DATE, allowNull: true })
appointment_date?: Date;

@Column({ type: DataType.STRING, allowNull: true })
appointment_time?: string;

}
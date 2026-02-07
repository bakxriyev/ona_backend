import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import { Service } from "../../services/model/service.entity";

@Table({ tableName: "service_details", timestamps: true })
export class ServiceDetail extends Model<ServiceDetail> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  // 🔗 Service bilan bog‘lanish
  @ForeignKey(() => Service)
  @Column({ type: DataType.BIGINT, allowNull: true })
  service_id?: number;

  @BelongsTo(() => Service)
  service?: Service;


  @Column(DataType.TEXT)
  title?: string;

  @Column(DataType.TEXT)
  title_ru?: string;

  // 💰 Narxi
  @Column(DataType.TEXT)
  price?: string;

  @Column(DataType.TEXT)
  price_ru?: string;


  // ℹ️ Qo‘shimcha ma’lumot
  @Column(DataType.TEXT)
  about?: string;

  @Column(DataType.TEXT)
  about_ru?: string;

  // 🖼 Media
  @Column(DataType.TEXT)
  photo?: string;

  @Column(DataType.TEXT)
  video?: string;
}

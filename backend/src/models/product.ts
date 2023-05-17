import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "products",
})
export class Products extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  productName!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity!: number;

  @Column({ type: DataType.STRING })
  imageUrl!: string;

  @Column({ type: DataType.STRING })
  batchNumber!: string;
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}

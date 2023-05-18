import { DataTypes, Model } from "sequelize";
import sequelize from "../database-connection";
import { Currency } from "./product";

enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  FULFILLED = "fulfilled",
}
export interface OrderedProduct {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  currency: Currency;
  imageUrl: string;
  batchNumber: string;
}

export interface OrderAttributes {
  id?: number;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  address: string;
  products?: OrderedProduct[]; // Embedded products
  createdAt?: Date;
  updatedAt?: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public status!: OrderStatus;
  public customerName!: string;
  public customerEmail!: string;
  public address!: string;
  public products?: OrderedProduct[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  },
  {
    tableName: "orders",
    sequelize,
  }
);

export default Order;

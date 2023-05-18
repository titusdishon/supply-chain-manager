import { DataTypes, Model } from "sequelize";
import sequelize from "../database-connection";
import Product from "./product";

enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  FULFILLED = "fulfilled",
}

interface OrderAttributes {
  id: number;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  quantity: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public status!: OrderStatus;
  public customerName!: string;
  public customerEmail!: string;
  public address!: string;
  public quantity!: number;
  public readonly products?: Product[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addProduct!: (product: Product) => Promise<void>;
  public addProducts!: (products: Product[]) => Promise<void>;
  public removeProduct!: (product: Product) => Promise<void>;
  public removeProducts!: () => Promise<void>;
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    sequelize,
  }
);

Order.belongsToMany(Product, {
  through: "OrderProduct",
  foreignKey: "orderId",
  as: "products",
});

export default Order;

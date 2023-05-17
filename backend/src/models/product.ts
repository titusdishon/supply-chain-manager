import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database-connection";

interface ProductAttributes {
  id: number;
  productName: string;
  quantity: number;
  imageUrl: string;
  batchNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public productName!: string;
  public quantity!: number;
  public imageUrl!: string;
  public batchNumber!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    batchNumber: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
  }
);

export default Product;

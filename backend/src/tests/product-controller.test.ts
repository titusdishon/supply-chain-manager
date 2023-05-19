import { Sequelize } from "sequelize-typescript";
import crypto from "crypto";
import { createAndLoginUser, req } from "./test-utils/auth-utils";
import { Currency } from "../models/product";
import { Response } from "express";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});
interface IProduct {
  productName: string;
  quantity: number;
  imageUrl: string;
  batchNumber: string;
  price: number;
  currency: Currency;
}
beforeAll(async () => {
  await sequelize.sync({ force: true, logging: false });
});

const product: IProduct = {
  productName: crypto.randomBytes(6).toString("hex"),
  quantity: 20,
  imageUrl: crypto.randomBytes(6).toString("hex"),
  batchNumber: crypto.randomBytes(6).toString("hex"),
  currency: Currency.USD,
  price: 300,
};
const createProductRequest = async (
  loggedIn?: boolean,
  hasProducts?: boolean
): Promise<Response> => {
  let token: string | null;
  if (loggedIn) {
    token = await createAndLoginUser();
  } else {
    token = null;
  }
  const response: any = await req
    .post("/products")
    .set("Authorization", `Bearer ${token}`)
    .send(hasProducts ? product : {});
  return response;
};

const getProductById = async (id?: string): Promise<Response> => {
  const response: any = await req.get(`/products/${id}`);
  return response;
};

const deleteProduct = async (
  id?: string,
  loggedIn?: boolean
): Promise<Response> => {
  let token: string | null;

  if (loggedIn) {
    token = await createAndLoginUser();
  } else {
    token = null;
  }
  const response: any = await req
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  return response;
};
describe("Create Product controller", () => {
  describe("createProduct", () => {
    it("Should create a new product successfully", async () => {
      const response: any = await createProductRequest(true, true);
      const { productName, quantity, batchNumber, currency } = response.body;
      expect(response.status).toBe(201);
      expect(productName).toBe(product.productName);
      expect(quantity).toBe(product.quantity);
      expect(batchNumber).toBe(product.batchNumber);
      expect(currency).toBe(product.currency);
    });

    it("Should return 401 if user creating product is not authorized ", async () => {
      const response: any = await createProductRequest(false, true);
      expect(response.status).toBe(401);
    });
    it("Should return 400 bad request if an empty product is passed ", async () => {
      const response: any = await createProductRequest(true, false);
      expect(response.status).toBe(400);
    });
  });
  describe("getProductById", () => {
    it("Should return created products by id", async () => {
      const response: any = await createProductRequest(true, true);
      const { productName, quantity, batchNumber, currency, id } =
        response.body;
      const returnedProduct: any = await getProductById(id);
      expect(returnedProduct.status).toBe(200);
      expect(productName).toBe(returnedProduct.body.productName);
      expect(quantity).toBe(returnedProduct.body.quantity);
      expect(batchNumber).toBe(returnedProduct.body.batchNumber);
      expect(currency).toBe(returnedProduct.body.currency);
    });

    it("Should return 500 if product ID is not passed", async () => {
      const response: any = await getProductById();
      expect(response.status).toBe(500);
    });
  });
  describe("getAllProducts", () => {
    it("Should return created products by id", async () => {
      const response: any = await req.get(`/products`);
      expect(response.status).toBe(200);
    });
  });
  describe("getProductById", () => {
    it("Should delete products successfully", async () => {
      const response: any = await createProductRequest(true, true);
      const { id } = response.body;
      const returnedProduct: any = await deleteProduct(id, true);
      expect(returnedProduct.status).toBe(204);
    });
    it("Should return 401 if user deleting product is not authorized ", async () => {
      const response: any = await await deleteProduct("1", false);
      expect(response.status).toBe(401);
    });
  });
});

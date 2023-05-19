import { Sequelize } from "sequelize-typescript";
import { UserRole } from "../models/user";
import crypto from "crypto";
import { createUser, loginUser } from "./test-utils/auth-utils";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

beforeAll(async () => {
  await sequelize.sync({ force: true, logging: false });
});

describe("User Login controller", () => {
  describe("loginUser", () => {
    it("Should successfully login an existing user", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      await createUser(user);
      const response: any = await loginUser({
        username: user.username,
        password: user.password,
      });
      const { token } = response.body;
      expect(response.status).toBe(200);
      expect(token).not.toBeNull();
    });

    it("Should return 401 if user does not exist", async () => {
      const response: any = await loginUser({
        username: "non-existent-user",
        password: "some-password",
      });
      expect(response.status).toBe(401);
    });
    it("Should return 401 if password is invalid", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      await createUser(user);
      const response: any = await loginUser({
        username: user.username,
        password: "invalid-password",
      });
      expect(response.status).toBe(401);
    });

    it("Should return 400 if username and password not provided ", async () => {
      const response: any = await loginUser({});
      expect(response.status).toBe(400);
    });
  });
});

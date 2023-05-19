import { Sequelize } from "sequelize-typescript";
import { UserRole } from "../models/user";
import crypto from "crypto";
import { createUser } from "./test-utils/auth-utils";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

beforeAll(async () => {
  await sequelize.sync({ force: true, logging: false });
});

describe("User controller", () => {
  describe("createUser", () => {
    it("Should create a new user", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      const response: any = await createUser(user);
      const { username, role, email } = response.body.user;
      expect(response.status).toBe(201);
      expect(username).toBe(user.username);
      expect(email).toBe(user.email);
      expect(role).toBe(user.role);
    });
    it("Should return 409 is the user already exists ", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      await createUser(user);
      const response: any = await createUser(user);
      expect(response.status).toBe(409);
    });
    it("Should return 400 if an empty user is passed ", async () => {
      const response: any = await createUser({});
      expect(response.status).toBe(400);
    });
  });
});

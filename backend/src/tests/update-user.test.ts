import { Sequelize } from "sequelize-typescript";
import { UserRole } from "../models/user";
import crypto from "crypto";
import { createUser, loginUser, updateUser } from "./test-utils/auth-utils";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

beforeAll(async () => {
  await sequelize.sync({ force: true, logging: false });
});

const createLoginUpdateUser = () => {
  return {
    createUser: async (user: any): Promise<number> => {
      const createResponse: any = await createUser(user);
      return createResponse.body.user.id;
    },
    loginUser: async (username: string, password: string): Promise<string> => {
      const loginResponse: any = await loginUser({
        username,
        password,
      });
      const { token } = loginResponse.body;
      return token;
    },
    updateUser: async (
      user: any,
      id?: number | null,
      token?: string
    ): Promise<any> => {
      const response: any = await updateUser(user, id, token);
      return response;
    },
  };
};

describe("User Update controller", () => {
  describe("updateUser", () => {
    it("Should update user successfully", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      const id = await createLoginUpdateUser().createUser(user);
      const token = await createLoginUpdateUser().loginUser(
        user.username,
        user.password
      );
      const updatedUser = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      const response = await createLoginUpdateUser().updateUser(
        updatedUser,
        id,
        token
      );
      const { username, email, role } = response.body.user;
      expect(username).toBe(updatedUser.username);
      expect(email).toBe(updatedUser.email);
      expect(role).toBe(updatedUser.role);
      expect(id).toBe(id);
    });

    it("Should return 401 the user is not logged in ", async () => {
      const user = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      const id = await createLoginUpdateUser().createUser(user);
      const updatedUser = {
        username: crypto.randomBytes(6).toString("hex"),
        password: "geek36",
        email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
        isActive: true,
        role: UserRole.ADMIN,
      };
      const response = await createLoginUpdateUser().updateUser(
        updatedUser,
        id
      );
      expect(response.status).toBe(401);
    });
    // it("Should return 404 if user does not exist ", async () => {
    //   const user = {
    //     username: crypto.randomBytes(6).toString("hex"),
    //     password: "geek36",
    //     email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
    //     isActive: true,
    //     role: UserRole.ADMIN,
    //   };
    //   const token = await createLoginUpdateUser().loginUser(
    //     user.username,
    //     user.password
    //   );
    //   const updatedUser = {
    //     username: crypto.randomBytes(6).toString("hex"),
    //     password: "geek36",
    //     email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
    //     isActive: true,
    //     role: UserRole.ADMIN,
    //   };
    //   const response = await createLoginUpdateUser().updateUser(
    //     updatedUser,
    //     null,
    //     token
    //   );
    //   expect(response.status).toBe(404);
    // });
  });
});

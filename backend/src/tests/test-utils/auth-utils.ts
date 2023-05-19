import { Response } from "express";
import request from "supertest";
import { UserRole } from "../../models/user";
import crypto from "crypto";

interface IUserLogin {
  username?: string;
  password?: string;
}
interface IUserRegister {
  username?: string;
  password?: string;
  email?: string;
  isActive?: boolean;
  role?: UserRole;
}
export const baseURL = "http://localhost:8000";
export const req: request.SuperTest<request.Test> = request(baseURL);

export const loginUser = async ({
  username,
  password,
}: IUserLogin): Promise<Response> => {
  const response: any = await req
    .post("/auth/login")
    .send({ username, password });
  return response;
};

export const createUser = async ({
  username,
  password,
  email,
  isActive,
  role,
}: IUserRegister): Promise<Response> => {
  const response: any = await req
    .post("/auth/register")
    .send({ username, password, email, isActive, role });
  return response;
};

export const updateUser = async (
  { username, password, email, isActive, role }: IUserRegister,
  id?: number | null,
  token?: string
): Promise<Response> => {
  const response: any = await req
    .put(`/auth/update/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ username, password, email, isActive, role });
  return response;
};

export const createAndLoginUser = async (): Promise<string> => {
  const user: IUserRegister = {
    username: crypto.randomBytes(6).toString("hex"),
    password: "geek36",
    email: `${crypto.randomBytes(6).toString("hex")}@gmail.com`,
    isActive: true,
    role: UserRole.ADMIN,
  };
  await createUser(user);
  const loginResponse: any = await loginUser({
    username: user.username,
    password: user.password,
  });
  const { token } = loginResponse.body;
  return token;
};

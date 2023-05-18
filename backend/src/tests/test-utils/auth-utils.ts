import { Request, Response } from "express";
import request from "supertest";
import { UserRole } from "../../models/user";

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
const baseURL = "http://localhost:8000";
let req: request.SuperTest<request.Test> = request(baseURL);

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

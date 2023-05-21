import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserAttributes } from "../models/user";
import { generateToken } from "../utils/auth-middlewares";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email, role, isActive } = req.body;
  if (
    username === undefined ||
    password === undefined ||
    email === undefined ||
    role === undefined ||
    isActive === undefined
  ) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create<any>({
      username,
      password: hashedPassword,
      email,
      isActive,
      role,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { username, password, email, role }: UserAttributes = req.body;
  if (
    username === undefined ||
    password === undefined ||
    email === undefined ||
    role === undefined ||
    id === undefined
  ) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUpdate.username = username;
    userToUpdate.email = email;
    userToUpdate.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userToUpdate.password = hashedPassword;
    }

    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: userToUpdate });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};

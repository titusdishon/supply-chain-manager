// orders/types.ts
export interface Order {
  id: string;
  productId: string;
  quantity: number;
  status: string;
}

export interface CartState {
  cart: Product[];
  error: string | null;
}

// products/types.ts
export interface Product {
  id?: number;
  price: number;
  quantity: number;
  batchNumber: string;
  currency: string;
  imageUrl: string;
  productName: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null | string;
  loading: boolean;
  error: string | null;
}

export interface RegistrationFormData {
  id?: string;
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  role: UserRole;
}

export interface UserState {
  users: RegistrationFormData[];
  loading: boolean;
  error: string | null;
}

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  USER = "user",
}

export enum CURRENCIES {
  USD = "USD",
  EURO = "EURO",
}

export enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  FULFILLED = "fulfilled",
}

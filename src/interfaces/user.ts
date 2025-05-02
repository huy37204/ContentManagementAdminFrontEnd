import { Role } from "../enums/Role";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateUserDto = Partial<Pick<IUser, "name" | "role" | "email">>;

export type AddUserDto = Pick<IUser, "name" | "email" | "password" | "role">;

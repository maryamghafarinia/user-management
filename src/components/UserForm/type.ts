import { IUser } from "types";

export interface IUserForm extends IUser {
  avatarFile?: File;
  strTags?: string;
}

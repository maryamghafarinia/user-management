export interface IUserBase {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  avatar?: string;
  linkToWebsite?: string;
  tags: string; // comma-separated string
}

export interface IUser extends IUserBase {
  id: number;
}

export interface IUserMutation extends IUser {
  avatarFile: File;
}

export interface IAPIResponseBase {
  status: boolean;
  message: string;
}

export interface IAPISuccessResponse {
  data: IUser | IUser[];
}

export interface IAPIErrorResponse {
  details: any;
}

export enum FormStatus {
  NONE,
  PENDING,
  SUCCESS,
  FAILURE,
}

import { Optional } from "sequelize";
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
} from "sequelize-typescript";

interface IUserAttributes {
  id: number;
  owner: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  avatar: string;
  linkToWebsite: string;
  tags: string;
}

interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

@Table
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  owner: string;

  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  age: number;

  @Column
  avatar: string;

  @Column
  linkToWebsite: string;

  @Column(DataType.STRING)
  tags: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

export default User;

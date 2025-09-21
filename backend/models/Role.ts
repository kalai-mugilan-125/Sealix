import { Table, Column, Model, HasMany, Unique } from 'sequelize-typescript';
import { User } from './User';
import { DataTypes } from 'sequelize'; // Import DataTypes

@Table
export class Role extends Model {
  // The @Unique decorator should come before @Column
  @Column(DataTypes.STRING) // Specify the data type
  name!: string;

  @HasMany(() => User)
  users!: User[];
}
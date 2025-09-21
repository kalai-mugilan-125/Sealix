import { Table, Column, Model , HasMany, BelongsTo, ForeignKey,Unique, IsEmail} from 'sequelize-typescript';
import { Document } from './Document';
import { Role } from './Role';
import { DataTypes } from 'sequelize'; // Import DataTypes

@Table
export class User extends Model {
    
  @Column(DataTypes.STRING) // Specify data type for email
  email!: string;

  @Column(DataTypes.STRING) // Specify data type for name
  name!: string;

  @Column(DataTypes.STRING) // Specify data type for passwordHash
  passwordHash!: string;

  @ForeignKey(() => Role)
  @Column(DataTypes.INTEGER) // Specify data type for foreign key
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Document, 'ownerId')
  documents!: Document[];
}
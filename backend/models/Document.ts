import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Verification } from './Verification';
import { DataTypes } from 'sequelize';

@Table
export class Document extends Model {
  @Column(DataTypes.STRING)
  title!: string;

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  ownerId!: number;

  @BelongsTo(() => User)
  owner!: User;

  @Column(DataTypes.STRING)
  fileUrl!: string;

  @Column(DataTypes.STRING)
  blockchainHash!: string;

  @Column(DataTypes.STRING)
  status!: string;

  @HasMany(() => Verification)
  verifications!: Verification[];
}
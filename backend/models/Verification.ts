import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Document } from './Document';
import { User } from './User';
import { DataTypes } from 'sequelize';

@Table
export class Verification extends Model {
  @ForeignKey(() => Document)
  @Column(DataTypes.INTEGER)
  documentId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  verifierId!: number;

  @BelongsTo(() => User)
  verifier!: User;

  @Column(DataTypes.STRING)
  status!: string;

  @Column(DataTypes.TEXT)
  remarks!: string;
}
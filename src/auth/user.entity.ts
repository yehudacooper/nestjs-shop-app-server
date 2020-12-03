import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bycrpt from 'bcrypt'
import { Product } from "../product/product.entity";
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // @Column()
  // age:number;

  @Column()
  password: string;


  @Column()
  salt: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(type => Product, product => product.user, { eager: true })
  products: Product[];


  async validatePassword(password: string): Promise<boolean> {
    const hash = await bycrpt.hash(password, this.salt);
    return hash == this.password;
  }
}
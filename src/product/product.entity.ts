import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '../auth/user.entity';


@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sort: string;

    @Column()
    height: string;

    @Column()
    price: string;

    @Column()
    imgSrc: string;

    @Column()
    bigImgSrc: string;

    @Column()
    material: string;

    @Column()
    description: string;

    @Column({nullable:true})
    qnty:string;

    @ManyToOne(type => User,user=>user.products,{eager:false})
    user: User;
}

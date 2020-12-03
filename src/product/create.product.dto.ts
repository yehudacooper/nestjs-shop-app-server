import { IsString } from "class-validator";


export class CreateProductDto {
    @IsString()
    sort: string;

    @IsString()
    height: string;

    @IsString()
    price: string;

    @IsString()
    imgSrc: string;

    @IsString()
    bigImgSrc: string;

    @IsString()
    material: string;

    @IsString()
    description: string;

    qnty?:string;

    userId?:number;
}
import { IsOptional, IsNotEmpty } from "class-validator";




export class GetProductsFilterDto{
     

    @IsOptional()
    @IsNotEmpty()
    search:string;
}
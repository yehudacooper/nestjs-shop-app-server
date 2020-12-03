import { Controller, Get, Param, ParseIntPipe, Body, Post, UsePipes, ValidationPipe, Delete, Patch, HttpException, HttpStatus, Query, UseGuards, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create.product.dto';
import { GetProductsFilterDto } from './get-products-filter.dto';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }
    @Get()
    getProducts(@Query() filterDto:GetProductsFilterDto):Promise<Product[]> {
      return this.productService.getTasks(filterDto);
    }



    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createProduct(@Body() createProductDto: CreateProductDto,@GetUser() user:User): Promise<Product> {
        if(user.role == "admin")
        return this.productService.createProduct(createProductDto);
        else{
            throw new  UnauthorizedException('you are not authorized to create new product');
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteProduct(@Param('id', ParseIntPipe) id: number,@GetUser() user:User): Promise<void> {
        if(user.role == "admin")
        return this.productService.deleteProduct(id);
        else{
            throw new  UnauthorizedException('you are not authorized to delete product');
        }
    }

    @Patch('/:productId')
    @UseGuards(AuthGuard())
    public async editProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto,
        @Param('productId', ParseIntPipe) productId: number,
        @GetUser() user:User
    ): Promise<Product> {
        if(user.role == "admin"){
        try {
            const product = await this.productService.editProduct(
                productId,
                createProductDto,
            );
            return product;
        }
        catch{
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'There is no product with such id to edit',
            }, HttpStatus.FORBIDDEN);
        }}
        else{
            throw new  UnauthorizedException('you are not authorized to edit product');
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create.product.dto';
import { GetProductsFilterDto } from './get-products-filter.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository, ) {

    }

    async getTasks(filterDto: GetProductsFilterDto): Promise<Product[]> {
        return this.productRepository.getTasks(filterDto);
    }

    async getProductById(id: number): Promise<Product> {
        const foundProduct = await this.productRepository.findOne(id);

        if (!foundProduct) {
            throw new NotFoundException(`Porduct with ID "${id}" not found`);
        }

        return foundProduct;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {

        return this.productRepository.createProduct(createProductDto);
    }


    async editProduct(
        productId: number,
        createProductDto: CreateProductDto,
    ): Promise<Product> {
        const editedProduct = await this.productRepository.findOne(productId);
        if (!editedProduct) {
            throw new NotFoundException('Product not found');
        }
        return this.productRepository.editProduct(createProductDto, editedProduct);
    }



    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);
        console.log(result);

        if (result.affected === 0) {
            throw new NotFoundException(`Porduct with ID "${id}" not found`);
        }

    }

}

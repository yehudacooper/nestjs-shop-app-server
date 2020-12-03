import { Repository, EntityRepository } from "typeorm";
import { Product } from "./product.entity";
import { CreateProductDto } from "./create.product.dto";
import { GetProductsFilterDto } from "./get-products-filter.dto";


@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

    async getTasks(filterDto: GetProductsFilterDto): Promise<Product[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('product');

        if (search) {
            query.andWhere('product.price LIKE :search OR product.description LIKE :search OR product.height LIKE :search', { search: `%${search}%` });
        }

        const products = await query.getMany();
        return products;
    }



    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { sort, price, height, imgSrc, bigImgSrc, description, material } = createProductDto;
        const product = new Product();
        product.sort = sort;
        product.price = price;
        product.height = height;
        product.imgSrc = imgSrc;
        product.bigImgSrc = bigImgSrc;
        product.material = material;
        product.description = description;

        await product.save();

        return product;
    }


    async editProduct(
        createProductDto: CreateProductDto,
        editedProduct: Product,
    ): Promise<Product> {
        const { sort, height, description, price, imgSrc, bigImgSrc, material } = createProductDto;

        editedProduct.sort = sort;
        editedProduct.description = description;
        editedProduct.price = price;
        editedProduct.height = height;
        editedProduct.material = material;
        editedProduct.imgSrc = imgSrc;
        editedProduct.bigImgSrc = bigImgSrc;


        await editedProduct.save();

        return editedProduct;
    }


}
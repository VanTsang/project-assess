import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    //创建商品
    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto)
    }

    //获取所有商品
    @Get()
    async findAll(): Promise<Product[]> { 
        return this.productsService.findAll()
    }

    //获取单个商品
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.productsService.findOne(id)
    }

    //更新商品
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productsService.update(id, updateProductDto)
    }

    //删除商品
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<Product> {
        return this.productsService.remove(id)
    }
}

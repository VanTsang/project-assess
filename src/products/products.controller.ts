import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    //创建商品
    @Post()
    @ApiOperation({ summary: '创建商品' })
    @ApiResponse({status: 200, description: '商品创建成功'})
    @ApiResponse({status: 400, description: '商品创建失败'})
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto)
    }

    //获取所有商品
    @Get()
    @ApiOperation({ summary: '获取所有商品' })
    @ApiResponse({status: 200, description: '获取所有商品成功'})
    @ApiResponse({status: 400, description: '获取所有商品失败'})
    async findAll(): Promise<Product[]> { 
        return this.productsService.findAll()
    }

    //获取单个商品
    @Get(':id')
    @ApiOperation({ summary: '获取单个商品' })
    @ApiResponse({status: 200, description: '获取单个商品成功'})
    @ApiResponse({status: 400, description: '获取单个商品失败'})
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(+id)
    }

    //更新商品
    @Patch(':id')
    @ApiOperation({ summary: '更新商品' })
    @ApiResponse({status: 200, description: '更新商品成功'})
    @ApiResponse({status: 400, description: '更新商品失败'})
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productsService.update(+id, updateProductDto)
    }

    //删除商品
    @Delete(':id')
    @ApiOperation({ summary: '删除商品' })
    @ApiResponse({status: 200, description: '删除商品成功'})
    @ApiResponse({status: 400, description: '删除商品失败'})
    async remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(+id)
    }
}

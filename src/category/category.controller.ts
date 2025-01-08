import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('categories')
@ApiTags('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    //创建分类
    @Post()
    @ApiOperation({ summary: '创建分类' })
    @ApiResponse({status: 200, description: '分类创建成功'})
    @ApiResponse({status: 400, description: '分类创建失败'})
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    //获取所有分类
    @Get()
    @ApiOperation({ summary: '获取所有分类' })
    @ApiResponse({status: 200, description: '获取所有分类成功'})
    @ApiResponse({status: 400, description: '获取所有分类失败'})
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    //根据id获取分类
    @Get(':id')
    @ApiOperation({ summary: '根据id获取分类' })
    @ApiResponse({status: 200, description: '根据id获取分类成功'})
    @ApiResponse({status: 400, description: '根据id获取分类失败'})
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(+id);
    }

    //更新分类
    @Patch(':id')
    @ApiOperation({ summary: '更新分类' })
    @ApiResponse({status: 200, description: '更新分类成功'})
    @ApiResponse({status: 400, description: '更新分类失败'})
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoryService.update(+id, updateCategoryDto);
    }

    //删除分类
    @Delete(':id')
    @ApiOperation({ summary: '删除分类' })
    @ApiResponse({status: 200, description: '删除分类成功'})
    @ApiResponse({status: 400, description: '删除分类失败'})
    async remove(@Param('id') id: string): Promise<Category> {
        return this.categoryService.remove(+id);
    }
}

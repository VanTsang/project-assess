import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const createCategory = async (data: {name: string, parentId: number}) => {
    //将data转换为json格式
    const jsonData = JSON.stringify(data);
    const response = await axios.post(`${API_URL}/categories`, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export const readCategory = async () => {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data;
}
export const updateCategory = async (id: number, data: {name: string, parentId: number}) => {
    //将data转换为json格式
    const jsonData = JSON.stringify(data);
    const response = await axios.put(`${API_URL}/categories/${id}`, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}
export const deleteCategory = async (id: number) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`)
    return response.data;
}

// 定义商品分类的类型
export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

// 获取商品分类
export const getCategory = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_URL}/categories`)
        console.log('获取商品分类成功', response.data)
        
        return response.data;  // 返回分类数据
    } catch (error) {
        console.error('获取商品分类失败', error);
        throw new Error('获取商品分类失败');
    }
};

// 读取分类下商品列表
export const readCategoryProducts = async (categoryId: number) => {
    try {
        const res = await fetch(`${API_URL}/categories/${categoryId}`)
        console.log("请求的url", `${API_URL}/categories/${categoryId}`);
        
        const data = await res.json()
        console.log('读取分类下商品列表成功', data)
        return data
    } catch (error) {
        throw new Error('读取分类下商品列表失败')
    }
}
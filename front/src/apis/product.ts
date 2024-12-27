import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const createProduct = async (data: {name: string, price: number, description: string, inventory: number, userId: number, categoryId: number}) => {
    //将data对象转换为json格式
    const jsonData = JSON.stringify(data)
    const response = await axios.post(`${API_URL}/products`, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const readProduct = async () => {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
}

export const updateProduct = async (id: number, data: {name: string, price: number, description: string, inventory: number, userId: number, categoryId: number}) => {
    //将data对象转换为json格式
    const jsonData = JSON.stringify(data)
    const response = await axios.patch(`${API_URL}/products/${id}`, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}

export const deleteProduct = async (id: number) => {
    const response = await axios.delete(`${API_URL}/products/${id}`)
    return response.data
}

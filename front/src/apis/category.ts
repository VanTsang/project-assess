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
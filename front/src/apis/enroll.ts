import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const register = async (data: {username: string, email: string, password: string}) => {
    // 将 data 对象转换为 JSON 格式  
    const jsonData = JSON.stringify(data);  
    const response = await axios.post(`${API_URL}/enroll/register`,  jsonData,{
       headers:{'Content-Type': 'application/json' }
    })
    
    return response.data
}
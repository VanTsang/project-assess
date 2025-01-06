import React from'react';

import {Button, Space} from 'antd';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate()

    //跳转到登录页面
    const goLogin = () => {
        navigate('/enroll/login')
    }

    //跳转到注册页面
    const goRegister = () => {
        navigate('/enroll/register')
    }

    return (
        <div className="background" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundImage: 'url(src/assets/4b1346c5d53a65a554eebc2b8978d84b.png)',backgroundSize: 'cover',backgroundPosition: 'center',height: '100vh',width: '100vw',border: 'none',margin: 0,padding: 0}}>
            <h1>电商商品管理系统欢迎您</h1>
            <Space direction='horizontal' size='middle' style={{display: 'flex', justifyContent: 'center'}}>
                <Button type='primary' onClick={goLogin}>
                    登录
                </Button>
                <Button type='primary' onClick={goRegister}>
                    注册
                </Button>
            </Space>
        </div>
    )
}
export default HomePage;
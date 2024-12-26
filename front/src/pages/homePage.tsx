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
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>电商商品管理系统欢迎您</h1>
            <Space direction='vertical' size='middle' style={{display: 'flex'}}>
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
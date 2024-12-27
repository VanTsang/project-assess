import React, { useEffect } from'react';
import {Button, Space, Typography} from 'antd';
import {useSelector} from'react-redux';//读取redux store中的数据
import {RootState, store} from '../store'
import { useNavigate } from 'react-router-dom';

const {Title, Text} = Typography

const MainPage = () => {
    const navigate = useNavigate();

    const isLogin = useSelector((state: RootState) => state.enroll.user)

    //登录后跳转到商品管理页面
    const goProductPage = () => {
        navigate('/main/product')
    }

    //登录后跳转到商品分类管理页面
    const goCategoryPage = () => {
        navigate('/main/category')
    }

    //退出登录
    const logout = () => {
        //清除用户信息，使用redux
        navigate('/enroll/login')
    }

    useEffect(() => {
        
        //判断用户是否登录，未登录跳转到登录页面
        if (!isLogin) {
            navigate('/enroll/login')
        }
    },[isLogin, navigate])
    console.log(isLogin);
    //如果用户未登录，则不渲染页面
    if (!isLogin) {
        return null
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={1}>电商商品管理系统欢迎您</Title>
            <Text>用户: {isLogin.email}</Text>

            <Space direction='vertical' size='middle' style={{ display: 'flex', margin: '20px'}}>
                <Button type='primary' onClick={goProductPage}>
                    商品管理
                </Button>
                <Button type='default' onClick={goCategoryPage}>
                    商品分类管理
                </Button>
                <Button type='link' onClick={logout}>
                    退出登录
                </Button>
            </Space>
        </div>
    )
}
export default MainPage;
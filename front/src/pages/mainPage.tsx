import React, { useEffect } from'react';
import {Button, Space, Typography} from 'antd';
import {useDispatch, useSelector} from'react-redux';//读取redux store中的数据
import {RootState, store} from '../store'
import { useNavigate } from 'react-router-dom';
import { clearUser, setUser } from '../store/enrollSlice';

const {Title, Text} = Typography

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()//清除用户信息
    const isLogin = useSelector((state: RootState) => state.enroll.user)

    

    //退出登录
    const logout = () => {
        //清除用户信息，使用redux
        dispatch(clearUser())
        navigate('/')
    }

    useEffect(() => {
        
        //判断用户是否登录，未登录跳转到登录注册页面
        if (!isLogin) {
            navigate('/')
        }
    },[isLogin, navigate])
    console.log(isLogin);
    //如果用户未登录，则不渲染页面
    if (!isLogin) {
        return null
    }

    return (
        <div className="background" style={{ textAlign: 'center', marginTop: '50px'}}>
            <Title level={1}>电商商品管理系统欢迎您</Title>
            <Text>用户: {isLogin.email}</Text>

            <Space direction='vertical' size='middle' style={{ display: 'flex', margin: '20px'}}>
                
                <Button type='link' onClick={logout}>
                    退出登录
                </Button>
            </Space>
        </div>
    )
}
export default MainPage;
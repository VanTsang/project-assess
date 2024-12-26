import React, { useState } from "react";
import {Form, Button, Input, message} from "antd";
import {login} from '../apis/enroll'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [loading, setLoading] = useState(false)//控制加载状态
    const navigate = useNavigate()

    //表单提交
    const handleLogin = async (value: any) => {
        setLoading(true)
        try {
            await login(value)//调用登录接口
            message.success('登录成功')
            navigate('/')//跳转到首页
        } catch (error) {
            message.error('登录失败，请检查邮箱或密码是否正确')
        } finally {
            setLoading(false)//请求结束后重置加载状态
        }
    }

    return (
        <Form 
            name="loginForm"
            onFinish={handleLogin}//表单提交事件
            layout="vertical"//垂直布局
            >
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, message: '请输入邮箱' },
                        { type: 'email', message: '请输入正确的邮箱格式' }]}
                >
                    <Input />
                </Form.Item>
                    <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
    )
}
export default LoginForm;

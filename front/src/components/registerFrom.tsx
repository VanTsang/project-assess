import React, { useState } from "react";
import {Form, Input, Button, message} from "antd";
import {register} from '../apis/enroll';
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)//控制加载状态
    const navigate = useNavigate()

    // 表单提交
    const handleRegister = async (value: any) => {
        setLoading(true)
        try {
            await register(value)//调用注册接口
            message.success('注册成功，返回登录页面')
            navigate('/login')
        } catch (error) {
            message.error('注册失败，请检查格式是否正确')
        } finally {
            setLoading(false)//请求结束后重置加载状态
        }
    }

    return (
        <Form
            name="registerForm"
            onFinish={handleRegister}//表单提交事件
            layout="vertical"//垂直布局
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true, message: '请输入邮箱!' },
                        {type: 'email',message: '请输入正确的邮箱格式!'}
                    ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码!' },
                            {min: 6, message: '密码长度至少为6位!'}
                        ]}
                        >
                            <Input.Password />
                        </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="确认密码"
                        rules={[{ required: true, message: '请确认密码!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码输入不一致!');
                                },
                            })
                        ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                注册
                            </Button>
                            </Form.Item>
            </Form>
    )
}

export default RegisterForm;
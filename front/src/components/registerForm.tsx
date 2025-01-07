import React, { useState } from "react";
import {Form, Input, Button, message, Row, Col} from "antd";
import {register} from '../apis/enroll';
import {useNavigate} from "react-router-dom";

//生成随机验证码
const RandomCode = (length: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)//控制加载状态
    const [code, setCode] = useState<string>('')//储存验证码
    const [userInputCode, setUserInputCode] = useState<string>('')//用户输入的验证码
    const navigate = useNavigate()

    //在组件加载时生成验证码
    React.useEffect(() => {
        const newCode = RandomCode(6)
        setCode(newCode)
    }, [])
    

    // 表单提交
    const handleRegister = async (value: any) => {
        setLoading(true)
        try {
            
            await register(value)//调用注册接口
            message.success('注册成功，返回登录页面')
            navigate('/enroll/login')
        } catch (error) {
            message.error('注册失败，请检查用户名或邮箱是否重复，格式是否正确')
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

                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    name="code"
                                    label="验证码"
                                    rules={[{ required: true, message: '请输入验证码!' },
                                        {validator: (_, value) => 
                                            value === code ? Promise.resolve() : Promise.reject('验证码错误!')
                                        }
                                    ]}
                                    >
                                        <Input
                                            value={userInputCode}
                                            onChange={(e) => setUserInputCode(e.target.value)}
                                            />
                                    </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" onClick={() => setCode(RandomCode(6))}>
                                    看不清，换一张
                                </Button>
                                <div 
                                    style={{
                                        marginTop: 10,
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        padding: '5px 10px',
                                        border: '1px solid #ddd',
                                        display: 'inline-block',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    >
                                        {code}
                                    </div>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                注册
                            </Button>
                            </Form.Item>
            </Form>
    )
}

export default RegisterForm;
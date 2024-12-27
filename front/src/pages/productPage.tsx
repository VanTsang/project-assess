import React, { useEffect, useState } from'react';
import {Table, Button, Input, Space, message, Form, Select, InputNumber, Modal} from 'antd';
import { createProduct, readProduct, updateProduct, deleteProduct } from '../apis/product';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/enrollSlice';

const ProductPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<any>(null)
    const [form] = Form.useForm()

    //获取商品列表
    const getProduct = async () => {
        setLoading(true)
        try {
            const res = await readProduct()
            setProduct(res.data)
        } catch (error) {
            message.error('获取商品列表失败')
        } finally {
            setLoading(false)
        }
        
    }

    //新增商品
    const createProduct = async (value: any) => {
        setLoading(true)
        try {
            await createProduct(value)
            message.success('新增商品成功')
            getProduct()
            setModalVisible(false)
        } catch (error) {
            message.error('新增商品失败')
        } finally {
            setLoading(false)
        }
        
    }

    //编辑商品
    const updateProduct = async (value: any) => {
        setLoading(true)
        try {
            await updateProduct(value)
            message.success('编辑商品成功')
            getProduct()
            setModalVisible(false)
        } catch (error) {
            message.error('编辑商品失败')
        } finally {
            setLoading(false)
        }
        
    }
    //删除商品
    const deleteProduct = async (id: number) => {
        setLoading(true)
        try {
            await deleteProduct(id)
            message.success('删除商品成功')
            getProduct()
        } catch (error) {
            message.error('删除商品失败')
        } finally {
            setLoading(false)
        }
        
    }

    //新增商品弹窗
    const CreateForm = () => {
        setIsEdit(false)
        setCurrentProduct(null)
        setModalVisible(true)
    }
    //编辑商品弹窗
    const EditForm = (product: any) => {
        setIsEdit(true)
        setCurrentProduct(product)
        form.setFieldsValue({
            name: product.name,
            price: product.price,
            description: product.description,
            inventory: product.inventory,
            categoryId: product.categoryId
        })
        setModalVisible(true)
    }

    useEffect(() => {
        getProduct()
        getCategory()
    },[])//空依赖数组，只在组件挂载时执行一次

    //表格列
    const columns = [
        {title: '商品名称', dataIndex: 'name', key: 'name'},
        {title: '价格', dataIndex: 'price', key: 'price'},
        {title: '商品描述', dataIndex: 'description', key: 'description'},
        {title: '库存', dataIndex: 'inventory', key: 'inventory'},
        {title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size='middle'>
                    <Button onClick={() => EditForm(record)}>编辑</Button>
                    <Button danger onClick={() => deleteProduct(record.id)}>删除</Button>
                </Space>
            )
        }
    ]
        return (
            <div>
                <Button type='primary' onClick={CreateForm} style={{marginBottom: 16}}>
                    新增商品
                </Button>
                <Table
                    columns={columns}
                    dataSource={product}
                    rowKey='id'
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    />

                    <Modal
                        open={modalVisible}
                        title={isEdit ? '新增商品' : '编辑商品'}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                        >
                        <Form
                            form={form}
                            onFinish={isEdit ? createProduct : updateProduct}
                            initialValues={{
                                name: '',
                                price: 0,
                                description: '',
                                inventory: 0,
                                categoryId: null
                            }}
                            
                            >
                                <Form.Item name='name' label='商品名称' rules={[{ required: true, message: '请输入商品名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name='price' label='价格' rules={[{ required: true, message: '请输入商品价格' }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name='description' label='商品描述'>
                                     <Input />
                                </Form.Item>
                                <Form.Item name='inventory' label='库存' rules={[{ required: true, message: '请输入商品库存' }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name='categoryId' label='分类' rules={[{ required: true, message: '请选择商品分类' }]}
                                >
                                    <Select>
                                        <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' loading={loading}>
                                        提交
                                    </Button>
                                </Form.Item>
                            </Form>
                            </Modal>
            </div>
        
    
)
}

export default ProductPage;
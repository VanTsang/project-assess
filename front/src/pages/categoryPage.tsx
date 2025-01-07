import React, { useState, useEffect } from'react';
import {Table,Button,Space,message,Input,Form,InputNumber,Modal} from 'antd';
import { useNavigate } from "react-router-dom";
import { createCategory, readCategory, updateCategory, deleteCategory } from '../apis/category';



const CategoryPage = () => {
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [form] = Form.useForm();

        //获取商品分类
            const getCategory = async () => {
                setLoading(true)
                try {
                    const res = await readCategory()
                    
                    setCategories(res)
                } catch (error) {
                    console.error("获取商品分类列表失败", error);
                    
                    message.error('获取商品分类列表失败')
                } finally {
                    setLoading(false)
                }
                
            }

        
        
        
    
        //新增商品分类
        const createCategoryHandler = async (value: any) => {
            setLoading(true)
            const categoryData = {
                name: value.name,
                parentId: value.parentId
            }
            try {
                await createCategory(categoryData)
                message.success('新增商品分类成功')
                getCategory()
                setModalVisible(false)
            } catch (error) {
                console.error("新增商品分类失败", error);
                
                message.error('新增商品分类失败')
            } finally {
                setLoading(false)
            }
            
        }
    
        //编辑商品分类
        const updateCategoryHandler = async (value: any) => {
            setLoading(true)
            const categoryData = {
                name: value.name,
                parentId: value.parentId
            }
            try {
                await updateCategory(currentCategory.id,categoryData)
                message.success('编辑商品分类成功')
                getCategory()
                setModalVisible(false)
            } catch (error) {
                message.error('编辑商品分类失败')
            } finally {
                setLoading(false)
            }
            
        }
        //删除商品分类
        const deleteCategoryHandler = async (id: number) => {
            Modal.confirm({
            title: '确认删除',
            content: '您确认要删除该分类吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                setLoading(true)
                    try {
                    await deleteCategory(id)
                    message.success('删除商品分类成功')
                    getCategory()
                    } catch (error) {
                    message.error('删除商品分类失败')
                    } finally {
                    setLoading(false)
                    }
                    },
                })

        }
    
        //新增商品分类弹窗
        const CreateForm = () => {
            setIsEdit(false)
            setCurrentCategory(null)
            setModalVisible(true)
        }
    
        //编辑商品分类弹窗
        const EditForm = (category: any) => {
            setIsEdit(true)
            setCurrentCategory(category)
            form.setFieldsValue({
                name: category.name,
                parentId: category.parendId
            })
            setModalVisible(true)
        }
    
        useEffect(() => {
            getCategory()
            //getCategory()
        },[])//空依赖数组，只在组件挂载时执行一次

        

            //表格列
            const columns = [
                {title: '商品分类名称', dataIndex: 'name', key: 'name'},
                {title: '商品分类id', dataIndex: 'id', key: 'id'},
                {title: '商品分类父id', dataIndex: 'parentId', key: 'parentId'},
                {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt',sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),render: (text: any) => new Date(text).toLocaleString()},//格式化时间
                {title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt',sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),render: (text: any) => new Date(text).toLocaleString()},//格式化时间
                {title: '操作',
                    key: 'action',
                    render: (_: any, record: any) => (
                        <Space size='middle'>
                            <Button onClick={() => EditForm(record)}>编辑</Button>
                            <Button danger onClick={() => deleteCategoryHandler(record.id)}>删除</Button>
                        </Space>
                    )
                }
            ]
            return (
                <div className="background">
                    <Button type='primary' onClick={CreateForm} style={{marginBottom: 16}}>
                        新增商品分类
                    </Button>
                    <Table
                        columns={columns}
                        dataSource={categories}
                        rowKey='id'
                        loading={loading}
                        pagination={{ pageSize: 8 }}
                        />
    
                        <Modal
                            open={modalVisible}
                            title={isEdit ? '编辑商品分类' : '新增商品分类'}
                            onCancel={() => setModalVisible(false)}
                            footer={null}
                            >
                            <Form
                                form={form}
                                onFinish={isEdit ? updateCategoryHandler : createCategoryHandler}
                                initialValues={{
                                    name: '',
                                    parentId: ''
                                }}
                                
                                >
                                    <Form.Item name='name' label='商品分类名称' rules={[{ required: true, message: '请输入商品分类名称' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name='parentId' label='商品分类父id' rules={[{  message: '请输入商品分类父id' }]}
                                    >
                                        <InputNumber />
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

export default CategoryPage;

function getCategory() {
    throw new Error('Function not implemented.');
}

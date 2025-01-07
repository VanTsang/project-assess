import React, { useState, useEffect } from'react';
import {Table,Button,Space,message,Input,Form,InputNumber,Modal,Select} from 'antd';
import { useNavigate } from "react-router-dom";
import { createCategory, readCategory, updateCategory, deleteCategory, readCategoryProducts } from '../apis/category';



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

        const checkCategoryHasProduct = async (categoryId: number) => {
            try {
                //调用API，检查分类下是否有商品
                const res = await readCategoryProducts(categoryId)
                console.log("检查分类商品结果",res.products);
                
                return res.products.length > 0 ? res.products.length > 0 :undefined//如果长度大于0，说明有商品
            } catch (error) {
                console.error("检查分类商品失败", error);
                
                message.error('检查分类商品失败')
                return false
            }
        }
        //删除商品分类
        const deleteCategoryHandler = async (id: number) => {
            const hasProduct = await checkCategoryHasProduct(id)//检查分类下是否有商品
            if (hasProduct) {
                message.error('该分类下有商品，不能删除!')
                return
            }
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
                {title: '商品父类', dataIndex: 'parentId', key: 'parentId',render: (text) => {
                                const category = categories.find((item) => item.id === text); // 查找匹配的分类
                                return category ? category.name : "无"; // 如果找到匹配的项，则返回名称，否则返回原始值
                              },},
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
                                    <Form.Item name='parentId' label='父类' 
                                    >
                                        <Select>
                                            <Select.Option value={null}>无</Select.Option>
                                    {categories.length === 0 ? (
                                   <Select.Option value={-1}>暂无分类数据</Select.Option>
                                   ) : (categories.map((category) => (
                                        <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)))}
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

export default CategoryPage;

function getCategory() {
    throw new Error('Function not implemented.');
}
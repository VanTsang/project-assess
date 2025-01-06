import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import {Layout, Menu} from "antd";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import MainPage from "../pages/mainPage";
import ProductPage from "../pages/productPage";
import CategoryPage from "../pages/categoryPage";

const { Content, Sider } = Layout;

const RouterConfig = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
   //  获取当前路径
   const location = useLocation();
  
   useEffect(() => {
       // 判断当前路由是否包含子路由（即判断是否是 /main 下的路径）
      const isChildRoute = location.pathname === '/main';
      if (isChildRoute) {
          // 展开菜单
          setCollapsed(true);
      } 
   },[ location ])
    return (
      

      <Layout style={{ minHeight: "100vh" }}>
        
        {collapsed&&(
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']} // 默认选中商品管理
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" onClick={() => {navigate('/main')}}>
              首页
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate('/main/products')}>
              商品管理
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/main/categories')}>
              商品分类管理
            </Menu.Item>
            
          </Menu>
        </Sider>)}
        

        

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/enroll/register" element={<RegisterPage />} />
        <Route path="/enroll/login" element={<LoginPage />} /> 
        <Route path="/main/products" element={<ProductPage />} />
        <Route path="/main/categories" element={<CategoryPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    )
}

export default RouterConfig;
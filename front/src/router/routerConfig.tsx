import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import MainPage from "../pages/mainPage";

const RouterConfig = () => {
    return (
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/enroll/register" element={<RegisterPage />} />
        <Route path="/enroll/login" element={<LoginPage />} /> 
    </Routes>)
}

export default RouterConfig;
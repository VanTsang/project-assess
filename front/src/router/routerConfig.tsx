import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";

const RouterConfig = () => {
    return (
        <Routes>
        <Route path="/enroll/register" element={<RegisterPage />} />
        <Route path="/enroll/login" element={<LoginPage />} /> 
    </Routes>)
}

export default RouterConfig;
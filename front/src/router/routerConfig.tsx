import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";

const RouterConfig = () => {
    return (
        <Routes>
        <Route path="/enroll/register" element={<RegisterPage />} />
    
    </Routes>)
}

export default RouterConfig;
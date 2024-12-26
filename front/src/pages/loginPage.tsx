import React from'react';

import LoginForm from '../components/loginForm';

const LoginPage = () => {
    return (
        <div style={{width: 400, margin: '0 auto', padding: 20}}>
            <h2>登录</h2>
            <LoginForm />
        </div>
    )
}
export default LoginPage;
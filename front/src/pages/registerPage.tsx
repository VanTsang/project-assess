import React from'react';

import RegisterForm from '../components/registerForm';

const RegisterPage = () => {
    return (
        <div style={{width: 400, margin: '0 auto', padding: 20}}>
            <h2>注册</h2>
            <RegisterForm />
        </div>
    )
}
export default RegisterPage;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const { setIsAdmin } = useContext(ShopContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple mock auth
            setIsAdmin(true);
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <ShieldCheck size={48} color="var(--color-accent-blue)" />
                    <h1>Admin Access</h1>
                </div>

                <form onSubmit={handleLogin}>
                    <Input
                        type="password"
                        placeholder="Enter Password (admin123)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                    />

                    <Button variant="primary" size="lg" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;

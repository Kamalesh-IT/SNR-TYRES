import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Zap } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Auth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!credentials.email || !credentials.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Logged in successfully:', data);
                // Save user info and token to localStorage
                localStorage.setItem('userInfo', JSON.stringify(data));

                // Navigate to home
                navigate('/');
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Server error during login');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-split">
                <div className="auth-visual">
                    <div className="glow-orb"></div>
                    <div className="auth-brand-logo">
                        <Zap size={24} color="var(--color-accent-blue)" /> SNR TYRES
                    </div>
                    <div className="auth-visual-content">
                        <h2>Precision.<br />Performance.<br />Excellence.</h2>
                        <p>Sign in to access exclusive high-end tyres, track your orders, and manage your garage.</p>
                    </div>
                </div>

                <div className="auth-content">
                    <div className="auth-card">
                        <div className="auth-header">
                            <div className="icon-wrapper">
                                <LogIn size={28} />
                            </div>
                            <div>
                                <h1>Welcome Back</h1>
                                <p>Enter your credentials to access your account</p>
                            </div>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={credentials.email}
                                onChange={handleChange}
                                error={error && !credentials.email ? 'Email is required' : ''}
                            />

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={handleChange}
                                error={error && !credentials.password ? 'Password is required' : ''}
                            />

                            {error && <div style={{ color: '#ff4d4d', fontSize: '0.9rem', marginTop: '-0.5rem' }}>{error}</div>}

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                style={{ marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="auth-footer">
                            Don't have an account?
                            <Link to="/register" className="auth-link">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

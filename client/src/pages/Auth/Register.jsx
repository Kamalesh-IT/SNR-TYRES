import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Zap } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully:', data);
                // Save user info/token if needed, or just redirect
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Server error during registration');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-split">
                <div className="auth-visual" style={{
                    background: 'linear-gradient(135deg, rgba(255, 77, 0, 0.1) 0%, rgba(10, 10, 15, 1) 100%)'
                }}>
                    <div className="glow-orb" style={{ background: 'var(--color-accent-orange)' }}></div>
                    <div className="auth-brand-logo">
                        <Zap size={24} color="var(--color-accent-orange)" /> SNR TYRES
                    </div>
                    <div className="auth-visual-content">
                        <h2>Join the<br />Elite.</h2>
                        <p>Create an account to track your vehicle's performance parts, save your configurations, and access premium customer support.</p>
                    </div>
                </div>

                <div className="auth-content">
                    <div className="auth-card">
                        <div className="auth-header">
                            <div className="icon-wrapper" style={{
                                background: 'rgba(255, 77, 0, 0.1) !important',
                                color: 'var(--color-accent-orange) !important',
                                boxShadow: '0 0 20px rgba(255, 77, 0, 0.2)',
                                borderColor: 'rgba(255, 77, 0, 0.2)'
                            }}>
                                <UserPlus size={28} />
                            </div>
                            <div>
                                <h1>Create Account</h1>
                                <p>Join SNR Tyres for exclusive deals</p>
                            </div>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            {error && <div style={{ color: '#ff4d4d', fontSize: '0.9rem', marginTop: '-0.5rem' }}>{error}</div>}

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                style={{ marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="auth-footer">
                            Already have an account?
                            <Link to="/login" className="auth-link">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { User, Mail, Phone, MapPin, Save, Edit3 } from 'lucide-react';
import './Auth.css';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateProfile(formData);
        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } else {
            setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
        }
        setLoading(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    if (!user) return <div className="container" style={{ marginTop: '5rem' }}>Please log in to view your profile.</div>;

    return (
        <div className="container profile-page" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="profile-card auth-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="profile-header auth-header" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>My Profile</h1>
                        <p>Manage your personal information and account settings.</p>
                    </div>
                    {!isEditing && (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit3 size={16} style={{ marginRight: '8px' }} /> Edit Profile
                        </Button>
                    )}
                </div>

                {message.text && (
                    <div className={`alert alert-${message.type}`} style={{ 
                        padding: '1rem', 
                        borderRadius: '8px', 
                        marginBottom: '1.5rem',
                        backgroundColor: message.type === 'success' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                        color: message.type === 'success' ? '#00ff7f' : '#ff4d4d',
                        border: `1px solid ${message.type === 'success' ? '#00ff7f' : '#ff4d4d'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            icon={<User size={18} />}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            icon={<Mail size={18} />}
                        />
                        <Input
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                            icon={<Phone size={18} />}
                        />
                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            icon={<MapPin size={18} />}
                            className="full-width"
                        />
                    </div>

                    {isEditing && (
                        <div className="profile-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <Button type="submit" variant="primary" disabled={loading}>
                                <Save size={18} style={{ marginRight: '8px' }} /> {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;

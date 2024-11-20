import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import '../styles/_register.scss';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeRoute = () => {
        navigate('/login');
    };

    const handleRegistration = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            return;
        }

        try {
            await registerUser(formData);
            handleChangeRoute();
        } catch (error) {
            console.log(error);

            setFormData({
                name: '',
                email: '',
                password: '',
            });
        }
    };

    return (
        <div className="registration-container">
            <h1>Rejestracja</h1>
            <div className="registration-box">
                <form onSubmit={handleRegistration}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nazwa"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Zarejestruj się</button>
                </form>
                <div className="have-account-text">
                    <p>Posiadasz już konto? <a href="/login">Zaloguj się</a></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
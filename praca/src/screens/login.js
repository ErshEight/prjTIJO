import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import '../styles/_login.scss';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!formData.login || !formData.password) {
            setErrors({ general: 'Brakuje uzupełnionego pola!' });
            return;
        }

        try {
            const response = await loginUser({
                login: formData.login,
                password: formData.password
            });

            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (error) {
            setErrors({ general: 'Błędne dane logowania, spróbuj ponownie' });
            setFormData({
                login: '',
                password: ''
            });
        }
    };

    return (
        <div className="login-container">
            <h1>Logowanie</h1>
            <div className="login-box">
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Nazwa"
                        name="login"
                        value={formData.login}
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
                    {errors.general && <div className="error-message">{errors.general}</div>}
                    <button type="submit">Zaloguj</button>
                </form>
                <div className="need-account-text">
                    <p>Nie masz konta? <a href="/register">Zarejestruj się</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
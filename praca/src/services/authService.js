import axios from 'axios';
import config from '../config';

export async function registerUser(userData) {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/user/create`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Błąd rejestracji');
    }
}

export async function loginUser(userData) {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/user/auth`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Błąd logowania');
    }
}

export async function logoutUser(userId) {
    try {
        const response = await axios.delete(`${config.apiBaseUrl}/api/user/logout/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Błąd próby wylogowania');
    }
}
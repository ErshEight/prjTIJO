import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../screens/register';
import Login from '../screens/login';
import * as authService from '../services/authService';

jest.mock('../services/authService');

const renderWithRouter = (component) => {
    render(<BrowserRouter>{component}</BrowserRouter>);
};

//TESTY INTEGRACYJNE
describe('Autentykacja użytkownika - Testy integracyjne', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('powinno pomyślnie zarejestrować nowego użytkownika', async () => {
        //given
        authService.registerUser.mockResolvedValueOnce({});

        await act(async () => {
            renderWithRouter(<Register />);
        });

        const emailInput = screen.getByPlaceholderText('Email');
        const nameInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const registerButton = screen.getByText('Zarejestruj się');

        //when
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(nameInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(registerButton);

        //then
        await waitFor(() => {
            expect(authService.registerUser).toHaveBeenCalledWith({
                name: 'test',
                email: 'test@test.com',
                password: '123',
            });
        });
    });

    test('powinno wyświetlić komunikat o błędzie przy nieudanej rejestracji', async () => {
        //given
        authService.registerUser.mockRejectedValueOnce(new Error('Register Failed'));

        await act(async () => {
            renderWithRouter(<Register />);
        });

        const emailInput = screen.getByPlaceholderText('Email');
        const nameInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const registerButton = screen.getByText('Zarejestruj się');

        //when
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(nameInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(registerButton);

        //then
        await waitFor(() => {
            expect(authService.registerUser).toHaveBeenCalledTimes(1);
        });
    });

    test('powinno pomyślnie zalogować użytkownika', async () => {
        //given
        authService.loginUser.mockResolvedValueOnce({ token: 'mock-token' });
        Storage.prototype.setItem = jest.fn();

        await act(async () => {
            renderWithRouter(<Login />);
        });

        const loginInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const loginButton = screen.getByText('Zaloguj');

        //when
        fireEvent.change(loginInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(loginButton);

        //then
        await waitFor(() => {
            expect(authService.loginUser).toHaveBeenCalledWith({
                login: 'test',
                password: '123',
            });
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
        });
    });

    test('sprawdza, czy wyświetlany jest odpowiedni komunikat błędu przy błędnym haśle', async () => {
        //given
        authService.loginUser.mockRejectedValueOnce(new Error('Błędne dane logowania'));
        await act(async () => {
            renderWithRouter(<Login />);
        });

        const loginInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const loginButton = screen.getByText('Zaloguj');

        //when
        fireEvent.change(loginInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
        fireEvent.click(loginButton);

        //then
        await waitFor(() => {
            expect(screen.getByText('Błędne dane logowania, spróbuj ponownie')).toBeInTheDocument();
        });
    });
});

//TESTY JEDNOSTKOWE
describe('Autentykacja użytkownika - Testy jednostkowe', () => {
    test('wyświetla komunikat błędu przy pustych polach logowania', async () => {
        //given
        renderWithRouter(<Login />);

        const loginButton = screen.getByText('Zaloguj');

        //when
        fireEvent.click(loginButton);

        //then
        await waitFor(() => {
            expect(screen.getByText('Brakuje uzupełnionego pola!')).toBeInTheDocument();
        });
    });

    test('rejestracja nie działa z pustymi polami', async () => {
        //given
        renderWithRouter(<Register />);

        const registerButton = screen.getByText('Zarejestruj się');

        //when
        fireEvent.click(registerButton);

        //then
        await waitFor(() => {
            expect(authService.registerUser).not.toHaveBeenCalled();
        });
    });

    test('sprawdza, czy pole hasła jest ukrywane podczas rejestracji', () => {
        //given
        renderWithRouter(<Register />);
        const passwordInput = screen.getByPlaceholderText('Hasło');

        //when
        fireEvent.change(passwordInput, { target: { value: 'secret-password' } });

        //then
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('formularz rejestracji resetuje się po błędzie', async () => {
        //given
        authService.registerUser.mockRejectedValueOnce(new Error('Rejestracja nieudana'));
        renderWithRouter(<Register />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nameInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const registerButton = screen.getByText('Zarejestruj się');

        //when
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(nameInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(registerButton);

        //then
        await waitFor(() => {
            expect(emailInput.value).toBe('');
            expect(nameInput.value).toBe('');
            expect(passwordInput.value).toBe('');
        });
    });

    test('sprawdza, czy komunikat błędu znika po poprawnym wypełnieniu formularza logowania', async () => {
        //given
        renderWithRouter(<Login />);
        const loginInput = screen.getByPlaceholderText('Nazwa');
        const passwordInput = screen.getByPlaceholderText('Hasło');
        const loginButton = screen.getByText('Zaloguj');

        fireEvent.click(loginButton);

        //when
        await waitFor(() => {
            expect(screen.getByText('Brakuje uzupełnionego pola!')).toBeInTheDocument();
        });

        fireEvent.change(loginInput, { target: { value: 'test' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(loginButton);

        //then
        await waitFor(() => {
            expect(screen.queryByText('Brakuje uzupełnionego pola!')).not.toBeInTheDocument();
        });
    });
});

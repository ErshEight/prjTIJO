import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from '../screens/search';
import axios from 'axios';

jest.mock('../services/authSpotify', () => ({
    getSpotifyToken: jest.fn().mockResolvedValue('mock-access-token'),
}));

jest.mock('axios');

const setup = async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Search />
            </BrowserRouter>
        );
    });
};

// TESTY INTEGRACYJNE
describe('Search - Testy integracyjne', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('sprawdza, czy przycisk wyszukiwania jest zablokowany przy pustym polu tekstowym', async () => {
        //given
        render(<Search />);
        const button = screen.getByText('Wyszukaj');

        //when
        fireEvent.click(button);

        //then
        await waitFor(() => {
            expect(screen.getByText('Nie znaleziono utworów.')).toBeInTheDocument();
        });
    });
});

// TESTY JEDNOSTKOWE
describe('Search - Testy jednostkowe', () => {
    test('sprawdza, czy input tekstowy istnieje na ekranie', () => {
        //given
        render(<Search />);

        //then
        const input = screen.getByPlaceholderText('Wprowadź nazwę zespołu');
        expect(input).toBeInTheDocument();
    });

    test('sprawdza, czy przycisk wyszukiwania istnieje na ekranie', () => {
        //given
        render(<Search />);

        //then
        const button = screen.getByText('Wyszukaj');
        expect(button).toBeInTheDocument();
    });
    
    test('powinno wyświetlić "Nie znaleziono utworów" gdy nie znaleziono artystów', async () => {
        //given
        axios.get.mockResolvedValueOnce({
            data: {
                artists: { items: [] },
            },
        });

        await setup();

        const input = screen.getByPlaceholderText('Wprowadź nazwę zespołu');
        const button = screen.getByText('Wyszukaj');

        //when
        act(() => {
            fireEvent.change(input, { target: { value: 'Unknown Artist' } });
            fireEvent.click(button);
        });

        //then
        await waitFor(() => {
            expect(screen.getByText('Nie znaleziono utworów.')).toBeInTheDocument();
        });
    });
});

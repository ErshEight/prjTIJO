import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecommendResult from '../screens/recommendResult';

const setup = (props) => {
    render(
        <BrowserRouter>
            <RecommendResult {...props} />
        </BrowserRouter>
    );
};

// TESTY INTEGRACYJNE
describe('RecommendResult', () => {
    test('sprawdza, czy wyświetlany jest komunikat "Brak rekomendacji", jeśli brak jest dostępnych wyników', () => {
        // given
        setup({ recommendations: [] });

        // then
        expect(screen.getByText((content, element) => content.includes('Brak rekomendacji'))).toBeInTheDocument();
    });
});
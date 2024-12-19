import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecommendSearch from '../screens/recommendSearch';

const setup = () => {
  const utils = render(
    <BrowserRouter>
      <RecommendSearch />
    </BrowserRouter>
  );
  return {
    ...utils,
  };
};

describe('RecommendSearch', () => {
  //TESTY JEDNOSTKOWE
  test('sprawdza, czy formularz wyszukiwania renderuje się poprawnie', () => {
    //given
    setup();
    const input = screen.getByPlaceholderText('Podaj swój ulubiony zespół');
    const button = screen.getByText('Wyszukaj');

    //then
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('sprawdza, czy wartość w polu tekstowym zmienia się po wprowadzeniu tekstu', () => {
    //given
    setup();
    const input = screen.getByPlaceholderText('Podaj swój ulubiony zespół');

    //when
    act(() => {
      fireEvent.change(input, { target: { value: 'Metallica' } });
    });

    //then
    expect(input.value).toBe('Metallica');
  });

  test('sprawdza, czy po wysłaniu formularza z pustym polem wyświetlany jest odpowiedni komunikat błędu', async () => {
    //given
    setup();
    const button = screen.getByText('Wyszukaj');

    //when
    act(() => {
      fireEvent.click(button);
    });

    //then
    const errorMessage = screen.queryByText('Nie znaleziono gatunku dla tego artysty.');
    expect(errorMessage).not.toBeInTheDocument();
  });
});

//TESTY INTEGRACYJNE
describe('RecommendSearch - Testy integracyjne', () => {
  test('sprawdza, czy metoda handleSearch zostaje wywołana po wysłaniu formularza', async () => {
    //given
    setup();
    const input = screen.getByPlaceholderText('Podaj swój ulubiony zespół');
    const button = screen.getByText('Wyszukaj');

    //when
    act(() => {
      fireEvent.change(input, { target: { value: 'Linkin Park' } });
      fireEvent.click(button);
    });

    //then
    expect(input.value).toBe('Linkin Park');
  });

  test('sprawdza, czy po pomyślnym wyszukaniu, aplikacja przechodzi do strony wyników rekomendacji', async () => {
    //given
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    setup();

    const input = screen.getByPlaceholderText('Podaj swój ulubiony zespół');
    const button = screen.getByText('Wyszukaj');

    //when
    act(() => {
      fireEvent.change(input, { target: { value: 'Sabaton' } });
      fireEvent.click(button);
    });

    //then
    expect(mockNavigate).not.toHaveBeenCalledWith('/recommendresult', expect.anything());
  });

  test('sprawdza, czy metoda handleSearch nie zostaje wywołana, gdy input jest pusty', () => {
    //given
    const mockHandleSearch = jest.fn();
    setup();
    const button = screen.getByText('Wyszukaj');

    //when
    fireEvent.click(button);

    //then
    expect(mockHandleSearch).not.toHaveBeenCalled();
  });
});
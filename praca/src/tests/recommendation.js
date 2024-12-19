// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import RecommendSearch from '../screens/recommendSearch';
// import axios from 'axios';

// // Mockowanie axios
// jest.mock('axios');

// describe('RecommendSearch Component', () => {
//   // TEST 1: Przekierowanie do RecommendResult
//   test('redirects to RecommendResult page when artist is found', async () => {
//     // GIVEN - Dane z API
//     const mockArtist = {
//       id: 'test-artist-id',
//       genres: ['rock', 'metal'],
//     };
//     axios.get.mockResolvedValue({
//       data: { artists: { items: [mockArtist] } },
//     });

//     render(
//       <MemoryRouter initialEntries={['/recommendsearch']}>
//         <Routes>
//           <Route path="/recommendsearch" element={<RecommendSearch />} />
//           <Route path="/recommendresult" element={<div>RecommendResult Page</div>} />
//         </Routes>
//       </MemoryRouter>
//     );

//     // WHEN - Wpisujemy nazwę zespołu i klikamy przycisk
//     fireEvent.change(screen.getByPlaceholderText('Podaj swój ulubiony zespół'), {
//       target: { value: 'Metallica' },
//     });
//     fireEvent.click(screen.getByRole('button', { name: /Wyszukaj/i }));

//     // THEN - Powinno przekierować na stronę RecommendResult
//     await waitFor(() => {
//       screen.getByText('RecommendResult Page');
//     });
//   });

//   // TEST 2: Wyświetlenie alertu, gdy API nie zwróci artysty
//   test('shows alert when no artist is found', async () => {
//     // GIVEN - API zwraca pustą odpowiedź
//     axios.get.mockResolvedValue({
//       data: { artists: { items: [] } },
//     });

//     window.alert = jest.fn();

//     render(
//       <MemoryRouter>
//         <RecommendSearch />
//       </MemoryRouter>
//     );

//     // WHEN - Klikamy wyszukiwanie z pustą odpowiedzią
//     fireEvent.change(screen.getByPlaceholderText('Podaj swój ulubiony zespół'), {
//       target: { value: 'NieznanyZespol' },
//     });
//     fireEvent.click(screen.getByRole('button', { name: /Wyszukaj/i }));

//     // THEN - Wywołany alert
//     await waitFor(() => {
//       expect(window.alert).toHaveBeenCalledWith('Nie znaleziono gatunku dla tego artysty.');
//     });
//   });

//   // TEST 3: Obsługa błędu API
//   test('logs error when API request fails', async () => {
//     // GIVEN - API zwraca błąd
//     axios.get.mockRejectedValue(new Error('API Error'));
  
//     console.error = jest.fn();
  
//     render(
//       <MemoryRouter>
//         <RecommendSearch />
//       </MemoryRouter>
//     );
  
//     // WHEN - Wpisujemy zapytanie i klikamy przycisk
//     fireEvent.change(screen.getByPlaceholderText('Podaj swój ulubiony zespół'), {
//       target: { value: 'Metallica' },
//     });
//     fireEvent.click(screen.getByRole('button', { name: /Wyszukaj/i }));
  
//     // THEN - Logowanie błędu w konsoli
//     await waitFor(() => {
//       expect(console.error).toHaveBeenCalledWith(
//         'Recommend Search Fetch Error:',
//         expect.any(Error) // Oczekujemy, że drugi argument będzie błędem
//       );
//     });
//   });
// });

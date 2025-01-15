# Nazwa kursu
Testowanie i jakość oprogramowania

# Autor
Igor Tokarski

# Temat projektu
Testowanie aplikacji rekomendacji utworów muzycznych

# Opis projektu

Aplikacja rekomenduje użytkownikowi utwory oraz artystów muzycznych na podstawie wprowadzonych parametrów. Wyszukiwarka rekomendacji przedstawia rekomendacje opierając się o artystów wprowadzonych przez użytkownika w pole wyszukiwania. W rezultacie wyszukiwania istnieje możliwość odsłuchania utworu za pomocą osadzonego odtwarzacza muzyki Spotify. Dołączona jest również wyszukiwarka utworów, która wyszukuje dowolny utwór muzyczny po wpisaniu odpowiedniego tytułu.

# Uruchomienie projektu
Z folderu "praca" -> npm start <br> <br>
Z folderu "server" -> node index.js

# Testy

[recommendResult.test.js](https://github.com/ErshEight/prjTIJO/blob/main/praca/src/tests/recommendResult.test.js) <br>
[recommendSearch.test.js](https://github.com/ErshEight/prjTIJO/blob/main/praca/src/tests/recommendSearch.test.js) <br>
[search.test.js](https://github.com/ErshEight/prjTIJO/blob/main/praca/src/tests/search.test.js) <br>
[user.test.js](https://github.com/ErshEight/prjTIJO/blob/main/praca/src/tests/user.test.js) <br>


# Dokumentacja API

[swaggerhub]()

# Przypadki testowe dla testera manualnego

## Test 1

| **ID**                | TC001       |
|------------------------|-------------|
| **Tytuł**             | Logowanie z poprawnymi danymi |
| **Warunki początkowe** | Formularz logowania jest otwarty. |
| **Kroki testowe**     | 1. Wprowadź poprawny login w polu "Nazwa".<br>2. Wprowadź poprawne hasło w polu "Hasło".<br>3. Naciśnij przycisk "Zaloguj". |
| **Oczekiwany rezultat** | Użytkownik zostaje przekierowany na stronę główną aplikacji. |

---

## Test 2

| **ID**                | TC002       |
|------------------------|-------------|
| **Tytuł**             | Wylogowanie z aplikacji |
| **Warunki początkowe** | Użytkownik jest zalogowany i znajduje się na dowolnym ekranie aplikacji. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Wyloguj się" w nagłówku.<br>2. Poczekaj na reakcję aplikacji.<br>3. Sprawdź, czy użytkownik zostaje przekierowany na ekran logowania, a sesja użytkownika została zakończona. |
| **Oczekiwany rezultat** | Użytkownik zostaje poprawnie wylogowany i przeniesiony na ekran logowania. |

---

## Test 3

| **ID**                | TC003       |
|------------------------|-------------|
| **Tytuł**             | Rejestracja z poprawnymi danymi |
| **Warunki początkowe** | Formularz rejestracji jest otwarty. |
| **Kroki testowe**     | 1. Wprowadź poprawny adres e-mail w polu "Email".<br>2. Wprowadź nazwę użytkownika w polu "Nazwa".<br>3. Wprowadź hasło w polu "Hasło".<br>4. Naciśnij przycisk "Zarejestruj się". |
| **Oczekiwany rezultat** | Konto użytkownika zostaje utworzone, a użytkownik jest przekierowany do formularza logowania. |

---

## Test 4

| **ID**                | TC004       |
|------------------------|-------------|
| **Tytuł**             | Powrót do wyszukiwania rekomendacji |
| **Warunki początkowe** | Użytkownik znajduje się na ekranie dowolnej rekomendacji utworu. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Wróć do wyszukiwania" w kontenerze rekomendacji.<br>2. Poczekaj na przeładowanie strony.<br>3. Sprawdź, czy użytkownik zostaje przekierowany na ekran wyszukiwania rekomendacji. |
| **Oczekiwany rezultat** | Użytkownik wraca na ekran wyszukiwania rekomendacji. |

---

## Test 5

| **ID**                | TC005       |
|------------------------|-------------|
| **Tytuł**             | Wyszukiwanie z pustym polem |
| **Warunki początkowe** | Formularz wyszukiwania artystów jest otwarty. |
| **Kroki testowe**     | 1. Pozostaw pole wyszukiwania puste.<br>2. Naciśnij przycisk "Wyszukaj".<br>3. Poczekaj na odpowiedź aplikacji. |
| **Oczekiwany rezultat** | Na ekranie wyświetla się komunikat o błędzie. |

---

## Test 6

| **ID**                | TC006       |
|------------------------|-------------|
| **Tytuł**             | Wyszukiwanie rekomendacji |
| **Warunki początkowe** | Użytkownik znajduje się na ekranie głównym. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Wyszukaj rekomendacje" w nagłówku.<br>2. Wprowadź nazwę zespołu w polu wyszukiwania.<br>3. Naciśnij przycisk "Wyszukaj".<br>4. Poczekaj na wyświetlenie wyników rekomendacji na ekranie. |
| **Oczekiwany rezultat** | Na ekranie wyświetlają się rekomendacje utworów na podstawie wprowadzonej nazwy zespołu. |

---

## Test 7

| **ID**                | TC007       |
|------------------------|-------------|
| **Tytuł**             | Wyszukanie kolejnej rekomendacji |
| **Warunki początkowe** | Wyświetlony jest ekran rekomendacji. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Kolejna rekomendacja".<br>2. Poczekaj na załadowanie nowej rekomendacji.<br>3. Sprawdź, czy wyświetlił się nowy utwór. |
| **Oczekiwany rezultat** | Wyświetla się nowa rekomendacja utworu. |

---

## Test 8

| **ID**                | TC008       |
|------------------------|-------------|
| **Tytuł**             | Wyświetlanie utworów w wyszukiwarce |
| **Warunki początkowe** | Użytkownik znajduje się na ekranie głównym. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Wyszukaj utwory" w nagłówku.<br>2. Wprowadź nazwę utworu lub artysty w polu wyszukiwania.<br>3. Naciśnij przycisk "Wyszukaj".<br>4. Poczekaj na wyświetlenie wyników wyszukiwania na ekranie. |
| **Oczekiwany rezultat** | Na ekranie wyświetlają się wyniki wyszukiwania zawierające odpowiednie utwory. |

---

## Test 9

| **ID**                | TC009       |
|------------------------|-------------|
| **Tytuł**             | Brak rekomendacji dla niedostępnych gatunków |
| **Warunki początkowe** | Wyświetlony jest ekran rekomendacji, ale żaden gatunek nie ma dostępnych utworów. |
| **Kroki testowe**     | 1. Naciśnij przycisk "Kolejna rekomendacja".<br>2. Poczekaj na komunikat błędu.<br>3. Sprawdź, czy aplikacja informuje o braku rekomendacji. |
| **Oczekiwany rezultat** | Wyświetla się komunikat "Błąd, spróbuj wyszukać ponownie". |

---

## Test 10

| **ID**                | TC010       |
|------------------------|-------------|
| **Tytuł**             | Wyświetlanie odtwarzacza Spotify Embed |
| **Warunki początkowe** | Użytkownik znajduje się na ekranie dowolnej rekomendacji utworu. |
| **Kroki testowe**     | 1. Sprawdź, czy widoczne jest okno osadzonego odtwarzacza Spotify.<br>2. Naciśnij w odtwarzacz Spotify.<br>3. Sprawdź, czy utwór zaczyna grać. |
| **Oczekiwany rezultat** | Odtwarzacz Spotify Embed działa poprawnie i odtwarza utwór. |

# Technologie użyte w projekcie

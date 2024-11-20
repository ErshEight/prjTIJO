import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/_header.scss';

function Header() {
    return (
        <header>
            <nav>
                <div className="nav-left">
                    <Link to="/">Home</Link>
                    <Link to="/recommendsearch">Wyszukaj rekomendacje</Link>
                    <Link to="/rankings">Ranking muzyki</Link>
                    <Link to="/search">Wyszukaj utwory</Link>
                </div>
                <div className="nav-right">
                    <Link to="/login">Zaloguj się</Link>
                    <Link to="/register">Zarejestruj się</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
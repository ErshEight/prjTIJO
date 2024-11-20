import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Home from './screens/home.js';
import RecommendSearch from './screens/recommendSearch';
import Search from './screens/search';
import './App.scss';
import Login from './screens/login.js';
import Register from './screens/register.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendsearch" element={<RecommendSearch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/_home.scss';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <p className='hello'>
        Witaj!
      </p>
      <p className="call-to-action">
        Odkryj coś nowego, znajdź swoje hity i ciesz się muzyką!
      </p>
      <button className="start-button" onClick={() => navigate('/recommendSearch')}>
        Rozpocznij teraz
      </button>
    </div>
  );
}

export default Home;
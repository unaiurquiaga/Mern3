import React from 'react';
import './Buttons.css';
import { Link } from 'react-router-dom';

function GameButtons(newGame) {
  return (
    <article className="gm-buttons">
      <button
        type="button"
        className="gm-cta"
        onClick={() => {
          newGame();
        }}
      >
        <p>Nueva partida</p>
      </button>
      <Link to="/">
        <button type="button" className="gm-cta">🏠</button>
      </Link>
    </article>
  );
}

export default GameButtons;
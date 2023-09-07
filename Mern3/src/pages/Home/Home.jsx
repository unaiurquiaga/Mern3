import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="gm-home">
      <h1>Juegos 🎮</h1>
      <div className="gm-home-games">
        <Link to="tictactoe">
          <article className="gm-home-game" id="tictactoe">
            <div className="gm-home-game-text">
              <h3>Tres en raya</h3>
            </div>
            <img
              className="gm-home-game-icon"
              src="/public/icons/tres-en-raya(1).png"
              alt="Tic Tac Toe"
            />
          </article>
        </Link>
        <Link to="hangman">
          <article className="gm-home-game" id="hangman">
            <div className="gm-home-game-text">
              <h3>Ahorcado</h3>
            </div>
            <img
              className="gm-home-game-icon"
              src="/public/icons/juego-del-ahorcado.png"
              alt="Hangman"
            />
          </article>
        </Link>
        <Link to="sudoku">
          <article className="gm-home-game" id="sudoku">
            <div className="gm-home-game-text">
              <h3>Sudoku</h3>
            </div>
            <img
              className="gm-home-game-icon"
              src="/public/icons/pasatiempo.png"
              alt="Sudoku"
            />
          </article>
        </Link>
      </div>
    </div>
  );
}

export default Home;
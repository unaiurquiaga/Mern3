import React, { useState } from 'react';
import './TicTacToe.css';
import GameButtons from '../../components/Buttons/Buttons';

// Creamos la función para el juego Tres en Raya
function TicTacToe() {
  // Creamos los estados para el juego
  const [player, setPlayer] = useState('');
  const [data, setData] = useState([null, null, null, null, null, null, null, null, null]);
  const [winnerMessage, setWinnerMessage] = useState('');

  // Combinaciones ganadores
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  function getRandomPlayer() {
    const players = [
      '/public/icons/x.png',
      '/public/icons/lavado-en-seco.png'
    ];
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
  }
  function newGame() {
    setData([null, null, null, null, null, null, null, null, null]);
    const game = document.querySelector('.gm-tictactoe-game');
    game.style.display = 'flex';
    setPlayer(getRandomPlayer());
  }
  function checkWinner() {
    winningCombinations.forEach((combination) => {
      const [index1, index2, index3] = combination;
      if (data[index1] === player && data[index2] === player && data[index3] === player) {
        setWinnerMessage(
          <h3>
            El ganador es:
            <img src={player} alt="player" className="gm-tictactoe-window-player" />
          </h3>
        );
        const game = document.querySelector('.gm-tictactoe-game');
        game.style.display = 'none';
      }
    });
    if (data.every((cell) => cell !== null)) {
      setWinnerMessage(<h3>Tablas!</h3>);
      const game = document.querySelector('.gm-tictactoe-game');
      game.style.display = 'none';
    }
  }
  function closeWinnerMessage() {
    setWinnerMessage('');
    newGame();
  }

  return (
    <div className="gm-tictactoe">
      <h1>Tres en raya</h1>
      <article className="gm-tictactoe-game">
        <div id="gm-tictactoe-board" className="gm-tictactoe-board">
          {data.map((space, index) => {
            return (
              <button
                key={index}
                type="button"
                id={`gm-tictactoe-cell-${index}`}
                className="gm-tictactoe-cell"
                onClick={() => {
                  if (data[index] === null) {
                    data[index] = `${player}`;
                    setPlayer(
                      player ===
                        '/public/icons/x.png'
                        ? '/public/icons/lavado-en-seco.png'
                        : '/public/icons/x.png'
                    );
                    checkWinner();
                  }
                }}
                disabled={data[index] !== null}
              >
                {space === null ? '' : <img src={space} alt="player" />}
              </button>
            );
          })}
        </div>
        <h3>
          Turno: <img src={player} alt="player" className="gm-tictactoe-player" />
        </h3>
      </article>
      {GameButtons(newGame)}
      {/* Lanzamos el mensaje cuando haya un resultado */}
      {winnerMessage && (
        <div className="window-winner">
          {winnerMessage}
          {/* <h3>{winnerMessage}</h3> */}
          <button type="button" className="gm-cta" onClick={closeWinnerMessage}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
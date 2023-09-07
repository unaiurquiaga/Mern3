import React, { useEffect, useState } from 'react';
import './Sudoku.css';
import { makepuzzle, solvepuzzle } from 'sudoku';
import GameButtons from '../../components/Buttons/Buttons';

function Sudoku() {
  const [sudokuBoard, setSudokuBoard] = useState('');
  const [newSudokuBoard, setNewSudokuBoard] = useState(null);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [result, setResult] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const newSudoku = makepuzzle();
    setSudokuBoard(newSudoku);
    setNewSudokuBoard(newSudoku);
  }, []);

  function newGame() {
    const game = document.querySelector('.gm-sudoku-game');
    game.style.display = 'flex';
    const newSudoku = makepuzzle();
    setSudokuBoard(newSudoku);
    setNewSudokuBoard(newSudoku);
    setCompleted(false);
    setResult(false);
  }

  function handleInputChange(event, index) {
    const newSudoku = [...newSudokuBoard];
    const inputValue = event.target.value === '' ? null : Number(event.target.value);

    if (inputValue !== null && (inputValue < 0 || inputValue > 8)) {
      alert('El número tiene que estar entre 0 y 8');
      return;
    }

    newSudoku[index] = inputValue;
    setNewSudokuBoard(newSudoku);

    // eslint-disable-next-line no-unused-expressions
    !newSudoku.includes(null) ? setCompleted(true) : setCompleted(false);
  }

  function renderCell(number, index) {
    const originalNumber = number === sudokuBoard[index] && number !== null;
    const value = number === null ? '' : number;

    return (
      <input
        type="number"
        key={index}
        id={`gm-sudoku-letter-${index}`}
        className="gm-sudoku-cell"
        value={value}
        min="0"
        max="8"
        disabled={originalNumber}
        onChange={(event) => handleInputChange(event, index)}
      />
    );
  }

  function checkSudoku() {
    const game = document.querySelector('.gm-sudoku-game');
    game.style.display = 'none';
    console.log('ei');
    const solved = solvepuzzle(sudokuBoard);
    if (solved.every((value, index) => value === newSudokuBoard[index])) {
      setWinnerMessage('Resuelto, enhorabuena');
      setResult(true);
    } else {
      setWinnerMessage('Erróneo');
      setResult(false);
    }
  }

  function closeWinnerMessage() {
    setWinnerMessage('');
    if (result) {
      newGame();
    } else {
      const game = document.querySelector('.gm-sudoku-game');
      game.style.display = 'flex';
    }
  }

  function resolveSudoku() {
    setNewSudokuBoard(solvepuzzle(sudokuBoard));
    closeWinnerMessage();
    setCompleted(false);
  }

  return (
    sudokuBoard && (
      <div className="gm-sudoku">
        <h1>Sudoku</h1>
        <article className="gm-sudoku-game">
          <div id="gm-sudoku-board" className="gm-sudoku-board">
            {newSudokuBoard.map((number, index) => {
              return renderCell(number, index);
            })}
          </div>
          <article className="gm-sudoku-buttons">
            <button type="button" className="gm-cta" onClick={resolveSudoku}>
              Ver la solución
            </button>
            <button
              type="button"
              className="gm-cta"
              onClick={() => checkSudoku()}
              disabled={!completed}
            >
              Comprobar
            </button>
          </article>
        </article>
        {GameButtons(newGame)}
        {/* Lanzamos el mensaje cuando haya un resultado */}
        {winnerMessage && (
          <div className="gm-sudoku-winner window-winner">
            <h3>{winnerMessage}</h3>
            <article className="gm-sudoku-buttons-window">
              {!result && (
                <button type="button" className="gm-cta" onClick={resolveSudoku}>
                  Solución
                </button>
              )}
              <button type="button" className="gm-cta" onClick={closeWinnerMessage}>
                {result ? 'Cerrar' : 'Seguir intentándolo'}
              </button>
            </article>
          </div>
        )}
      </div>
    )
  );
}

export default Sudoku;
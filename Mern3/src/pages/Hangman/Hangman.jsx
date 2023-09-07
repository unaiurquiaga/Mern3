import React, { useEffect, useState } from 'react';
import './Hangman.css';
import GameButtons from '../../components/Buttons/Buttons';

// Creamos la función para el juego El ahorcado
function Hangman() {
  // Creamos los estados para el juego
  const [word, setWord] = useState(null);
  const [lifes, setLifes] = useState('0');
  const [hint, setHint] = useState(null);
  const [winnerMessage, setWinnerMessage] = useState(null);

  const words = [
    'perro',
    'ordenador',
    'programacion',
    'cantera',
    'ojo',
    'terraza',
    'agua',
    'telefono',
    'helicoptero',
    'secador'
  ];

  const lifeImg = [
    {
      img: '/public/icons/verdugo.png'
    },
    {
      img: '/public/icons/state4_corazon-roto.png'
    },
    {
      img: '/public/icons/state3_corazon-roto.png'
    },
    {
      img: '/public/icons/state2_corazon-roto.png'
    },
    {
      img: '/public/icons/state1_corazon.png'
    }
  ];

  const vocabulary = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];

  useEffect(() => {
    if (word && hint === word.join('')) {
      setWinnerMessage(<h3>Superaste el reto</h3>);
      const game = document.querySelector('.gm-hangman-game');
      game.style.display = 'none';
    }
  }, [hint]);

  useEffect(() => {
    if (lifes === 0) {
      setWinnerMessage(
        <h3>
          La liaste, te han matado
          <img src={lifeImg[0].img} alt="hangman" className="gm-hangman-logo" />
        </h3>
      );
      const game = document.querySelector('.gm-hangman-game');
      game.style.display = 'none';
    }
  }, [lifes]);

  function vocabularyClick(letter, event) {
    const letterButton = event.target;
    letterButton.disabled = true;
    if (word.includes(letter.toUpperCase())) {
      const newHint = hint
        .split('')
        .map((char, index) => (word[index] === letter ? letter : char))
        .join('');
      setHint(newHint);
      letterButton.classList.add('good');
    } else {
      setLifes(lifes - 1);
      letterButton.classList.add('bad');
    }
  }
  function vocabularyBoard() {
    return vocabulary.map((letter) => {
      return (
        <button
          type="button"
          key={letter}
          id={`gm-hangman-letter-${letter}`}
          className="gm-hangman-letter"
          onClick={(event) => {
            vocabularyClick(letter, event);
          }}
        >
          {letter}
        </button>
      );
    });
  }

  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex].toUpperCase().split('');
    const maskedWord = '_'.repeat(selectedWord.length);
    setWord(maskedWord);
    setHint(maskedWord);
    return selectedWord;
  }

  function vocabularyDefault() {
    const vocabularyButtons = document.querySelectorAll('.gm-hangman-vocabulary button');
    vocabularyButtons.forEach((button) => {
      button.classList.remove('good');
      button.classList.remove('bad');
      button.classList.add('gm-hangman-letter');
      button.removeAttribute('disabled');
    });
  }

  function newGame() {
    const game = document.querySelector('.gm-hangman-game');
    game.style.display = 'flex';
    setWord(getRandomWord());
    setLifes(4);
    vocabularyDefault();
  }

  function closeWinnerMessage() {
    setWinnerMessage('');
    newGame();
  }

  return (
    <div className="gm-hangman">
      <h1>El ahorcado</h1>
      <article className="gm-hangman-game">
        <span className="gm-hangman-life">
          <p>{lifes}</p>
          <img
            src="/public/icons/me-gusta.png"
            alt="life"
            className="gm-hangman-life-icon"
          />
        </span>
        <span className="gm-hangman-state">
          {/* <h3>Estado de vida: </h3> */}
          <img src={lifeImg[lifes].img} alt="life-state" />
        </span>
        <span className="gm-hangman-hint">
          <h3>Pista: </h3> <h3 id="hint">{hint}</h3>
        </span>
        <article className="gm-hangman-vocabulary">{vocabularyBoard()}</article>
      </article>
      {GameButtons(newGame)}
      {/* Lanzamos el mensaje cuando haya un resultado */}
      {winnerMessage && (
        <div className="gm-hangman-winner window-winner">
          {winnerMessage}
          <h2>{word}</h2>
          <button type="button" className="gm-cta" onClick={closeWinnerMessage}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default Hangman;
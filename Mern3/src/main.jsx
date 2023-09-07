import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import Hangman from './pages/Hangman/Hangman';
import Sudoku from './pages/Sudoku/Sudoku';
import Error from './pages/Error/Error';

// Usamos ReactDom para crear las diferentes rutas a las páginas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="hangman" element={<Hangman />} />
          <Route path="sudoku" element={<Sudoku />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
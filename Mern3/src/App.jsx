import React from 'react';
import './App.css';
import './components/FinalWindow.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Board from "./Board"


function App() {

  const [guess, setGuess] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setGuess(guess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(event.key) && guess.length < 5) {
      setGuess(guess + event.key.toUpperCase());
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <header className="App-header">
        <p style={{
          fontSize: '36px', fontWeight: "bold", marginBottom: "10px"
        }} >Word500 Solver</p>
        <Board guess={guess} setGuess={setGuess} />
      </header>
    </div>
  );
}

export default App;

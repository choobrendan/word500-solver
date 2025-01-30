import React, { useState, useEffect } from 'react';
import './App.css';
import Board from "./Board";
import words from './words.txt';

function App() {
  const [inputs, setInputs] = useState([]); // Original word list
  const [filteredInputs, setFilteredInputs] = useState([]); // Filtered word list based on difficulty
  const [guess, setGuess] = useState('');
  const [difficulty, setDifficulty] = useState('green'); // Default difficulty

  // Fetch the word list on component mount
  useEffect(() => {
    fetch(words)
      .then((r) => r.text())
      .then(text => {
        const wordList = text.split("\n").map(word => word.trim().toUpperCase());
        setInputs(wordList);
        filterWords(wordList, difficulty); // Apply initial filter
      })
      .catch(error => console.error('Error fetching words:', error));
  }, []);

  // Filter words based on difficulty
  const filterWords = (wordList, difficulty) => {
    let filteredList = [...wordList];

    if (difficulty === 'green') {
      filteredList = wordList.filter(word => {
        const hasRepeatingLetters = /(.).*\1/.test(word);
        const hasRestrictedLetters = /[JXQZ]/.test(word);
        return !hasRepeatingLetters && !hasRestrictedLetters;
      });
    } else if (difficulty === 'yellow') {
      // Filter words with repeating letters only
      filteredList = wordList.filter(word => !/(.).*\1/.test(word));
    } else if (difficulty === 'red') {
      // Use the original word list
      filteredList = wordList;
    }

    setFilteredInputs(filteredList);
  };

  // Handle difficulty selection
  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    filterWords(inputs, selectedDifficulty); // Re-filter words
  };

  // Handle keyboard input
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setGuess(guess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(event.key) && guess.length < 5) {
      setGuess(guess + event.key.toUpperCase());
    }
  };
  return (

    <div className="App" tabIndex={0} onKeyDown={handleKeyDown} style={{ height: "100%" }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ fontSize: '30px', fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Word500 Solver</p>

        {/* Difficulty Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginLeft: '20px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: difficulty === 'green' ? 'darkgreen' : 'green',
              cursor: 'pointer',
              border: difficulty === 'green' ? '2px solid black' : 'none',
            }}
            onClick={() => handleDifficultyChange('green')}
            title="Green: No repeating letters, no J, X, Q, Z"
          />
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: difficulty === 'yellow' ? 'darkgoldenrod' : 'yellow',
              cursor: 'pointer',
              border: difficulty === 'yellow' ? '2px solid black' : 'none',
            }}
            onClick={() => handleDifficultyChange('yellow')}
            title="Yellow: No repeating letters"
          />
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: difficulty === 'red' ? 'darkred' : 'red',
              cursor: 'pointer',
              border: difficulty === 'red' ? '2px solid black' : 'none',
            }}
            onClick={() => handleDifficultyChange('red')}
            title="Red: No filters"
          />
        </div>
        <div>
          <a href="https://www.instagram.com/brendan_choo7">
            <i class="fa fa-instagram" style={{ fontSize: "36px", marginLeft: '20px' }}></i></a>
          <a href="https://github.com/choobrendan/">
            <i class="fa fa-github" style={{ fontSize: "36px", marginLeft: '10px' }}></i></a>
        </div>
      </div>
      {/* Board Component */}
      <div>
        <Board guess={guess} inputs={filteredInputs} setGuess={setGuess} />
      </div>
    </div>
  );
}

export default App;
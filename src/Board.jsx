import { useState, useEffect } from "react";
import "./Board.css";
import Answers from "./Answers";

const Board= ({ inputs }) => {
  const [board, setBoard] = useState(Array(8).fill('').map(() => Array(8).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleInput(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, currentRow, currentCol]);

  const handleInput = (key) => {
    if (currentRow >= 8) return;
    if (currentCol < 5 && /^[a-zA-Z]$/.test(key)) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol] = key.toUpperCase();
      setBoard(newBoard);
      setCurrentCol(currentCol + 1);
    } else if (currentCol >= 5 && currentCol < 8 && /^[0-5]$/.test(key)) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol] = key;
      setBoard(newBoard);
      setCurrentCol(currentCol + 1);
    } else if (key === "Backspace" && currentCol > 0) {
      const newBoard = [...board];
      newBoard[currentRow][currentCol - 1] = "";
      setBoard(newBoard);
      setCurrentCol(currentCol - 1);
    } else if (key === "Enter" && (currentCol === 5 || currentCol === 8)) {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  };

  const handleTileTouch = (rowIndex, colIndex) => {
    setCurrentRow(rowIndex);
    setCurrentCol(colIndex);
  };

  const resetBoard = () => {
    setBoard(Array(8).fill('').map(() => Array(8).fill('')));
    setCurrentRow(0);
    setCurrentCol(0);
  };

  const resetRow = () => {
    const newBoard = [...board];
    newBoard[currentRow] = Array(8).fill('');
    setBoard(newBoard);
    setCurrentCol(0);
  };

  const keyboardRows = [
    "QWERTYUIOP", 
    "ASDFGHJKL", 
    "ZXCVBNM", 
    "012345", 
  ];

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((tile, j) => (
              <div 
                key={j} 
                className="tile" 
                onClick={() => handleTileTouch(i, j)} 
                role="button"
              >
                {tile}
              </div>
            ))}
          </div>
        ))}
        <div className="reset-buttons">
          <button class="reset" onClick={resetBoard}>Reset All</button>
          <button class="reset" onClick={resetRow}>Reset Row</button>
          <button class="reset" onClick={() => handleInput("Backspace")}>Backspace</button>
          <button class="reset" onClick={() => handleInput("Enter")}>Enter</button>
        </div>
      </div>

      <div className="keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split('').map((key) => (
              <button class="keyboards" key={key} onClick={() => handleInput(key)}>{key}</button>
            ))}
          </div>
        ))}
      </div>

      <Answers inputs={inputs}  guess={board} />
    </div>
  );
}

export default Board;

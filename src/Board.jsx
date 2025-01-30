import { useState, useEffect } from "react";
import "./Board.css";
import Answers from "./Answers";

function Board() {
  const [board, setBoard] = useState(Array(8).fill('').map(() => Array(8).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentRow >= 8) return; // Prevent input after 6 rows

      const key = event.key;
      // Check for input restrictions
      if (currentCol < 5) {
        // Allow letters only for the first 5 columns
        if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
          const newBoard = [...board];
          newBoard[currentRow][currentCol] = key.toUpperCase();
          setBoard(newBoard);
          setCurrentCol(currentCol + 1);
        }
      } else if (currentCol >= 5 && currentCol < 8) {
        // Allow numbers from 0-5 only for the last 3 columns
        if (/^[0-5]$/.test(key) && currentCol < 8) {
          const newBoard = [...board];
          newBoard[currentRow][currentCol] = key;
          setBoard(newBoard);
          setCurrentCol(currentCol + 1);
        }
      }

      // Handle Backspace
      if (key === "Backspace" && currentCol > 0) {
        const newBoard = [...board];
        newBoard[currentRow][currentCol - 1] = "";
        setBoard(newBoard);
        setCurrentCol(currentCol - 1);
      }

      // Handle Enter
      if (key === "Enter" && (currentCol === 5 || currentCol === 8)) {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, currentRow, currentCol]);
  return (
    <div className="">
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((tile, j) => (
              <div key={j} className="tile">{tile}</div>
            ))}
          </div>
        ))}
      </div>
      <Answers guess={board} />
    </div>
  );
}

export default Board;

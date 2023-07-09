import { useState } from "react";
import "./sudokuboard.css";

const SudokuBoard = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const onCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const renderBoard = () => {
    
    
  };

  return <div className="sudoku-board">{renderBoard()}</div>;
};

export default SudokuBoard;

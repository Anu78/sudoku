import "./options.css";
import { solveBoard } from "../Sudoku.js";

const Options = ({ board, setBoard }) => {
  function solve() {
    const solvedBoard = solveBoard(board);
    const newBoard = [...solvedBoard];
    setBoard(newBoard);
  }

  return (
    <>
      <h1>Options</h1>
      <button onClick={solve}>SOLVE</button>
    </>
  );
};

export default Options;

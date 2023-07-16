import "./App.css";
import { useState } from "react";
import Options from "./options/Options";
import SudokuBoard from "./sudokuboard/SudokuBoard";

export default function App() {
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

  return (
    <div className="container">
      <div id="leftThird" className="thirds">
        {/* options div */}
        <Options board={board} setBoard={setBoard} />
      </div>

      <div id="midThird" className="thirds">
        {/* sudoku board div */}
        <SudokuBoard board={board} setBoard={setBoard} />
      </div>
      <div id="rightThird" className="thirds">
        {/* timer div */}
      </div>
    </div>
  );
}

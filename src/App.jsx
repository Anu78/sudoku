import "./App.css";
import { useState } from "react";
import Options from "./options/Options";
import SudokuBoard from "./sudokuboard/SudokuBoard";

export default function App() {
  const [board, setBoard] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const [isSolving, setisSolving] = useState(false)
  const [zen, setZen] = useState(false)

  return (
    <div className="container">
      <div id="leftThird" className="thirds">
        {/* options div */}
        <Options
          isSolving={isSolving}
          setisSolving={setisSolving}
          board={board}
          setBoard={setBoard}
          zen={zen}
        />
      </div>

      <div id="midThird" className="thirds">
        {/* sudoku board div */}
        <SudokuBoard
          isSolving={isSolving}
          setisSolving={setisSolving}
          board={board}
          setBoard={setBoard}
        />
      </div>
      <div id="rightThird" className="thirds">
        {/* timer div */}
      </div>
    </div>
  );
}

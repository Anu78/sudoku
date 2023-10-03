import "./App.css";
import { useState } from "react";
import Options from "./options/Options";
import SudokuBoard from "./sudokuboard/SudokuBoard";
import AppContext from "./AppContext";
import Profile from "./profile/Profile";

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

  const [isSolving, setisSolving] = useState(false);
  const [settings, setSettings] = useState({
    difficulty: 20,
    verification: false,
    board_highlight: true,
    zen_mode_solving: false,
    theme: false,
  });
  const [userSolving, setuserSolving] = useState(false);
  return (
    <AppContext.Provider
      value={{
        board,
        setBoard,
        isSolving,
        setisSolving,
        settings,
        setSettings,
        userSolving,
        setuserSolving,
      }}
    >
      <div className="container">
        <div id="leftThird" className="thirds">
          <Options />
        </div>

        <div id="midThird" className="thirds">
          <SudokuBoard />
        </div>
        <div id="rightThird" className="thirds">
          <Profile />
        </div>
      </div>
    </AppContext.Provider>
  );
}

import "./options.css";
import { resetBoard, solveBoard } from "../Sudoku.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AppContext from "../AppContext";

const Options = () => {
  const resetBtn = {
    "--c": "#E95A49",
  };
  const {isSolving, setisSolving, board, setBoard, settings, setSettings} = useContext(AppContext)

  function generatePuzzle() {
    alert("puzzle generated");
  }

  function generateToast(type, msg) {
    switch (type) {
      case "error":
        toast.error(msg, {});
        break;
      case "info":
        toast.info(msg, {});
        break;
      case "success":
        toast.success(msg, {});
        break;
      case "promise":
        // yet to be seen how we implement this
        break;
      case "default":
        console.log("invalid toast type for generateToast function");
        break;
    }
  }

  function midUpdateBoard(board) {
    const newBoard = [...board];

    setBoard(newBoard);
  }

  async function solve() {
    setisSolving(true);

    // Use try-catch block to handle errors
    try {
      const solvedBoard = await solveBoard(board, midUpdateBoard);
      const newBoard = [...solvedBoard];
      setBoard(newBoard);
      generateToast("success", "The board was solved!");
    } catch (error) {
      // Handle any errors from solveBoard
      console.error(error);
      generateToast("error", "An error occurred while solving the board");
    }

    setisSolving(false);
  }

  function reset() {
    const zeroBoard = resetBoard(board);
    setBoard([...zeroBoard]);

    generateToast("info", "The board was reset!");
  }

  return (
    <>
      <div id="opt-heading" className="opt-thirds">
        <h1>options</h1>
        <p id="opt-sub-heading">update board settings below.</p>
      </div>

      <div id="opt-form" className="option-thirds">
        <label htmlFor="zen-mode-solving">
          <input
            id="zen-mode-solving"
            type="checkbox"
            value={settings.zen_mode_solving}
            onChange={() => {
              setSettings((prevState) => ({
                ...prevState,
                zen_mode_solving: !prevState.zen_mode_solving,
              }));
            }}
          />
          enable zen mode upon solve?
        </label>
        <label htmlFor="disable-board-highlight">
          <input
            id="disable-board-highlight"
            type="checkbox"
            value={settings.board_highlight}
            onChange={() => {
              setSettings((prevState) => ({
                ...prevState,
                board_highlight: !prevState.board_highlight,
              }));
            }}
          />
          disable board highlight?
        </label>
        <label htmlFor="disable-verification">
          <input
            id="disable-verification"
            type="checkbox"
            value={settings.verification}
            onChange={() => {
              setSettings((prevState) => ({
                ...prevState,
                verification: !prevState.verification,
              }));
            }}
          />
          disable solving hints?
          <p id="minify-verification">
            This will disqualify you from leaderboard spots.
          </p>
        </label>
        <label htmlFor="difficulty-slider">
          <input
            id="difficulty-slider"
            type="range"
            min={0}
            max={80}
            step={20}
            value={settings.difficulty}
            onChange={(event) => {
              setSettings((prevState) => ({
                ...prevState,
                difficulty: parseInt(event.target.value),
              }));
            }}
          />
          puzzle difficulty:
          <p id="current-difficulty">
            {(() => {
              const difficulty = settings.difficulty;
              if (difficulty === 0) return "beginner";
              if (difficulty === 20) return "easy";
              if (difficulty === 40) return "medium";
              if (difficulty === 60) return "hard";
              else {
                return "impossible";
              }
            })()}
          </p>
        </label>
        <button id="generate-board" onClick={generatePuzzle}>
          generate new puzzle
        </button>
      </div>

      <div id="opt-solve" className="option-thirds">
        <button
          disabled={isSolving}
          style={resetBtn}
          onClick={reset}
          id="reset-btn"
          className="buttons"
        >
          reset
        </button>
        <button
          disabled={isSolving}
          onClick={solve}
          id="solve-btn"
          className="buttons"
        >
          solve
        </button>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
    </>
  );
};

export default Options;

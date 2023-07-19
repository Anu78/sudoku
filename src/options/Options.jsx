import "./options.css";
import { resetBoard, solveBoard } from "../Sudoku.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Options = ({ board, setBoard, isSolving, setisSolving}) => {
  const resetBtn = {
    "--c": "#E95A49",
  };

  const [settings, setSettings] = useState({
    difficulty: 50,
    verification: false,
    board_highlight: true,
    zen_mode_solving: false,
    theme: false,
  });

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
        <h1>Options</h1>
        <p id="opt-sub-heading">Update board settings below.</p>
      </div>

      <div id="opt-form" className="option-thirds">
        <label htmlFor="zen-mode-solving">
          <input
            id="zen-mode-solving"
            type="checkbox"
            value={settings["zen-mode-solving"]}
          />
          Enable zen mode when solving?
        </label>
        <label htmlFor="disable-board-highlight">
          <input
            id="disable-board-highlight"
            type="checkbox"
            value={settings["board-highlight"]}
          />
          Disable board highlight?
        </label>
        <label htmlFor="disable-verification">
          <input
            id="disable-verification"
            type="checkbox"
            value={settings["verification"]}
          />
          Disable solving hints?
          <p id="minify-verification">
            This will disqualify you from leaderboard spots.
          </p>
        </label>
        <label htmlFor="difficulty-slider">
          <input
            id="difficulty-slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={settings["difficulty"]}
            onChange={(event) => {
              setSettings((prevState) => ({
                ...prevState,
                difficulty: event.target.value,
              }));
            }}
          />
          Puzzle difficulty:{" "}
          <p id="current-difficulty">{settings["difficulty"]}</p>
        </label>
      </div>

      <div id="opt-solve" className="option-thirds">
        <button
          disabled={isSolving}
          style={resetBtn}
          onClick={reset}
          id="reset-btn"
          className="buttons"
        >
          Reset
        </button>
        <button
          disabled={isSolving}
          onClick={solve}
          id="solve-btn"
          className="buttons"
        >
          Solve
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

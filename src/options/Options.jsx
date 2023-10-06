import "./options.css";
import { resetBoard, solveBoard } from "../Sudoku.js";
import { ToastContainer, toast } from "react-toastify";
import { useHotkeys } from "react-hotkeys-hook";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import ShortcutOverlay from "./shortcuts-overlay/Overlay";
import SettingsOverlay from "./settings-overlay/Overlay";

const Options = () => {
  const resetBtn = {
    "--c": "#E95A49",
  };
  const { isSolving, setisSolving, board, setBoard, settings, setSettings } =
    useContext(AppContext);
  const [shortVisible, setshortVisible] = useState(false);
  const [settingsVisible, setsettingsVisible] = useState(false);
  const [loginVisible, setloginVisible] = useState(false);

    // keyboard shortcuts
    useHotkeys("s", () => {
      solve();
    });
    useHotkeys("r", () => {
      reset();
    });
    useHotkeys("h", () => {
      setSettings((prevState) => ({
        ...prevState,
        board_highlight: !prevState.board_highlight,
      }));
    });
    useHotkeys("v", () => {
      setSettings((prevState) => ({
        ...prevState,
        verification: !prevState.verification,
      }));
    });
    useHotkeys("t", () => {
      console.log("theme switching coming soon");
    });
    useHotkeys("esc", () => {
      if (isSolving) {
        // maybe set the board to something unsolvable so that the algorithm fails
      }
      else if (setshortVisible) {
        setshortVisible(false)
      }
    });
    useHotkeys("g", () => {
      generatePuzzle();
    });
    useHotkeys("shift+?", () => {
      setshortVisible(!shortVisible);
    });
    
  function generatePuzzle() {
    console.log("puzzle generated");
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
      {shortVisible ?
      <ShortcutOverlay/> : ""
      }
      {shortVisible ?
      <ShortcutOverlay/> : ""
      }
      {shortVisible ?
      <ShortcutOverlay/> : ""
      }
      <div id="opt-heading" className="opt-thirds">
        <h1>options</h1>
        <p id="opt-sub-heading">update board settings below.</p>
      </div>

      <div id="opt-form" className="option-thirds">
        <label htmlFor="disable-board-highlight">
          <input
            id="disable-board-highlight"
            type="checkbox"
            value={settings.board_highlight}
            checked={settings.board_highlight}
            onChange={() => {
              setSettings((prevState) => ({
                ...prevState,
                board_highlight: !prevState.board_highlight,
              }));
            }}
          />
          <p className="option-sub"> board highlight? </p>
        </label>
        <label htmlFor="disable-verification">
          <input
            id="disable-verification"
            type="checkbox"
            value={settings.verification}
            checked={settings.verification}
            onChange={() => {
              setSettings((prevState) => ({
                ...prevState,
                verification: !prevState.verification,
              }));
            }}
          />
          <p className="option-sub">
            enable solving hints? <br />
            <i className="option-hint">
              {" "}
              This will disqualify you from leaderboard spots.{" "}
            </i>
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
          <p id="current-difficulty">
            {"puzzle difficulty: " +
              (() => {
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

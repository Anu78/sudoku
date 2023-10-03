import "./sudokuboard.css";
import "../Sudoku.js"
import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { validBoard } from "../Sudoku.js";

const SudokuBoard = () => {
  const { isSolving, board, setBoard, settings } = useContext(AppContext);

  const [focusedCell, setFocusedCell] = useState({ row: null, col: null });

  const handleChange = (e, row, col) => {
    let newValue = e.target.value;

    if (newValue.length > 1) return;
    if (newValue === "") newValue = 0;
    const newBoard = [...board];
    newBoard[row][col] = parseInt(newValue, 10);
    setBoard(newBoard);

    if (settings["verification"]) {
      let boardError = validBoard(board);
      if (!boardError) {
        // reset all invalid highlights
        console.log(true)
      }
      
      else {
        console.log(boardError)
        if (boardError.type === "row"){
          // highlight invalid row
        }
        else if (boardError.type === "col"){
          // 
        }
        else {
          //
        }
        }
      }
  };

  const handleFocus = (row, col) => {
    setFocusedCell({ row, col });
  };

  const shouldHighlight = (row, col, board_highlight) => {
    if (!board_highlight) return false

    if (focusedCell.row === null || focusedCell.col === null) {
      return false;
    }

    // Check if in the same row or column
    if (focusedCell.row === row || focusedCell.col === col) {
      return true;
    }

    // Check if in the same 3x3 box
    const startRow = Math.floor(focusedCell.row / 3) * 3;
    const startCol = Math.floor(focusedCell.col / 3) * 3;

    return (
      row >= startRow &&
      row < startRow + 3 &&
      col >= startCol &&
      col < startCol + 3
    );
  };

  return (
    <form id="sudoku-board">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr id={"row" + rowIndex} className="table-row" key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <td
                  className={`table-cell col${columnIndex} ${
                    shouldHighlight(
                      rowIndex,
                      columnIndex,
                      settings.board_highlight
                    )
                      ? "highlight"
                      : ""
                  }`}
                  key={columnIndex}
                >
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={cellValue || ""}
                    onChange={(e) => handleChange(e, rowIndex, columnIndex)}
                    onFocus={() => handleFocus(rowIndex, columnIndex)}
                    onBlur={() => setFocusedCell({ row: null, col: null })}
                    disabled={isSolving}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default SudokuBoard;

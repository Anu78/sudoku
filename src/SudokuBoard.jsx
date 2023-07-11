import "./sudokuboard.css";

const SudokuBoard = ({ board, setBoard }) => {
  return (
    <div id="sudoku-board">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr className="table-row" key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <td className="table-col" key={columnIndex}>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={cellValue || ""}
                    onChange={(e) => {
                      if (e.target.value.length > 1) return;
                      const newValue = parseInt(e.target.value, 10);
                      // Call a function to update the board state in the parent component
                      setBoard((prevBoard) => {
                        const newBoard = [...prevBoard];
                        newBoard[rowIndex][columnIndex] = newValue;
                        return newBoard;
                      });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuBoard;

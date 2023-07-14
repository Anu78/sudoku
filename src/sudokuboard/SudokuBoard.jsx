import "./sudokuboard.css";

const SudokuBoard = ({ board, setBoard }) => {
  const handleChange = (e, row, col) => {
    let newValue = e.target.value;

    if (newValue.length > 1) return;
    if (newValue === "") newValue = 0;
    const newBoard = [...board];
    newBoard[row][col] = parseInt(newValue, 10);
    setBoard(newBoard);
  };

  return (
    <form id="sudoku-board">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr
              id={"row" + (rowIndex + 1)}
              className="table-row"
              key={rowIndex}
            >
              {row.map((cellValue, columnIndex) => (
                <td
                  className={("table-cell", "col" + (columnIndex + 1))}
                  key={columnIndex}
                >
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={cellValue || ""}
                    onChange={(e) => handleChange(e, rowIndex, columnIndex)}
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

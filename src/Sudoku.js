export function resetBoard(board) {
  // Reset the board to the initial state
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
    }
  }

  return board
}

class Cell {
  constructor(cell, valueSet) {
    this.index = cell;
    this.valueSet = valueSet;
    this.possibilites = valueSet.size;
  }
}

export function validBoard(board) {
  class error {
    constructor(type, index) {
      this.type = type;
      this.index = index;
    }
  }

  for (let i = 0; i < board.length; i++) {
    var row = board[i].filter((element) => element != 0);
    let rowSet = new Set(row);
    if (row.length !== rowSet.size) return new error("row", i + 1);
  }

  for (let col = 0; col < 9; col++) {
    const seenValues = new Set();

    for (let row = 0; row < 9; row++) {
      const value = board[row][col];

      if (value !== 0) {
        // Add this condition
        if (seenValues.has(value)) {
          return new error("column", col + 1);
        }
        seenValues.add(value);
      }
    }
  }

  for (let rowOffset = 0; rowOffset < 9; rowOffset += 3) {
    for (let colOffset = 0; colOffset < 9; colOffset += 3) {
      var grid = [];

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          grid.push(board[rowOffset + i][colOffset + j]);
        }
      }
      grid = grid.filter((num) => num !== 0);

      const gridSet = new Set(grid);
      if (gridSet.size != grid.length)
        return new error("grid", (rowOffset / 3) * 3 + colOffset / 3 + 1);
    }
  }

  return true; // if no checks failed
}

function invertSet(originalSet) {
  const invertedSet = new Set([...Array(9)].map((_, i) => i + 1));

  originalSet.forEach((element) => {
    invertedSet.delete(element);
  });

  return invertedSet;
}

function possible(x, y, board) {
  // get elements in row
  let rowSet = new Set(board[x].filter((num) => num !== 0));

  let colSet = new Set(board.map((row) => row[y]).filter((num) => num !== 0));
  let gridSet = new Set();

  const startRow = Math.floor(x / 3) * 3;
  const startCol = Math.floor(y / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      const num = board[i][j];
      if (num === 0) continue;
      gridSet.add(num);
    }
  }

  let finalSet = new Set([...rowSet, ...colSet, ...gridSet]);
  finalSet.delete(undefined);

  return invertSet(finalSet);
}

function evalBoardState(board) {
  let possibleValues = []
    for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const num = board[i][j];

      if (num !== 0) continue;

      const values = possible(i, j, board);
      possibleValues.push(new Cell([i, j], values));
    }
  }

  possibleValues.sort((a, b) => a.possibilites - b.possibilites);

  return possibleValues
}

export function solveBoard(board) {
    let possibleValues = evalBoardState(board) // evaluate all cells on the board

    if (possibleValues.length === 0) return board // no solution

    const cell = possibleValues.shift()

    const [row,col] = cell.index

    for(let num of cell.valueSet){
        board[row][col] = num
        const result = solveBoard(board)
        if (result) {
            return result
        }
        board[row][col] = 0
    }
    possibleValues.unshift(cell)
}
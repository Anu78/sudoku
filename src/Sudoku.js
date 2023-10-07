export function resetBoard(board) {
  // Reset the board to the initial state
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = 0;
    }
  }

  return board;
}

class Cell {
  constructor(cell, valueSet) {
    this.index = cell;
    this.valueSet = valueSet;
    this.possibilites = valueSet.size;
  }
}

function getNthGrid(grid, n) {
  const rowStart = Math.floor(n / 3) * 3;
  const colStart = (n % 3) * 3;
  const subgrid = [];

  for (let i = rowStart; i < rowStart + 3; i++) {
    const subgridRow = [];
    for (let j = colStart; j < colStart + 3; j++) {
      subgridRow.push(grid[i][j]);
    }
    subgrid.push(subgridRow);
  }

  return subgrid;
}

export function boardToString(board) {
  let res = "";
  for (var i in board) {
    for (var j in i) {
      if (board[i][j] === 0) {
        res += ".";
      } else {
        res += board[i][j].toString();
      }
    }
  }
  return res;
}

function validBoardHelper(error, grid) {
  let unique = new Set();
  switch (error.type) {
    case "row":
      for (var i = 0; i < grid.length; ++i) {
        if (grid[error.index][i] === 0) {
          continue;
        } else if (unique.has(grid[error.index][i])) {
          error.pos = i;
          return [error.index, i];
        }
        unique.add(grid[error.index][i]);
      }
      break;
    case "col":
      for (i = 0; i < grid.length; ++i) {
        if (grid[i][error.index] === 0) {
          continue;
        } else if (unique.has(grid[i][error.index])) {
          return [i, error.index];
        }

        unique.add(grid[i][error.index]);
      }
      break;
    case "grid":
      var subgrid = getNthGrid(grid, error.index);
      for (i = 0; i < subgrid.length; i++) {
        for (var j = 0; j < subgrid[i].length; j++) {
          if (subgrid[i][j] === 0) continue;
          if (unique.has(subgrid[i][j])) {
            error.type = "row";
            error.pos = (error.index % 3) * 3 + j;
            error.index = Math.floor(error.index / 3) * 3 + i;
            return [error.index, error.pos];
          }

          unique.add(subgrid[i][j]);
        }
      }
      break;
  }
}

export function validBoard(board) {
  class Error {
    constructor(type, index, pos) {
      this.type = type;
      this.index = index;
      this.pos = pos;
    }
  }

  for (let i = 0; i < board.length; i++) {
    var row = board[i].filter((element) => element != 0);
    let rowSet = new Set(row);

    if (row.length !== rowSet.size)
      return validBoardHelper(new Error("row", i), board);
  }

  for (let col = 0; col < 9; col++) {
    const seenValues = new Set();

    for (let row = 0; row < 9; row++) {
      const value = board[row][col];

      if (value !== 0) {
        // Add this condition
        if (seenValues.has(value)) {
          return validBoardHelper(new Error("col", col), board);
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
        return validBoardHelper(
          new Error("grid", (rowOffset / 3) * 3 + colOffset / 3),
          board
        );
    }
  }

  return false; // no checks failed
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
  let possibleValues = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const num = board[i][j];

      if (num !== 0) continue;

      const values = possible(i, j, board);
      possibleValues.push(new Cell([i, j], values));
    }
  }

  possibleValues.sort((a, b) => a.possibilites - b.possibilites);

  return possibleValues;
}

export function solveBoard(board, boardCallback) {
  let changes = [];

  solveHelper(board, boardCallback, changes);

  console.log(changes);
  return changes;
}

export function solveHelper(board, boardCallback, changes) {
  let possibleValues = evalBoardState(board);
  let ms = 100;

  if (possibleValues.length === 0) return true; // Return the list of changes, not board

  const cell = possibleValues.shift();
  const [row, col] = cell.index;

  const originalValue = board[row][col]; // Store the original value for backtracking

  for (let num of cell.valueSet) {
    board[row][col] = num;
    changes.push({ row: row, col: col, val: num });
    boardCallback(board);
    const result = solveHelper(board, boardCallback, changes); // Pass changes array as an argument
    if (result) {
      return true;
    }
  }

  // Backtrack to the original value
  board[row][col] = originalValue;
  changes.push({ row: row, col: col, val: originalValue });
  boardCallback(board);

  possibleValues.unshift(cell);

  return false
}
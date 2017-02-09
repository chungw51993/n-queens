/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findAllRookSolutions = _.memoize(function(n) {
  if (!n) {
    return [];
  }

  if (n === 1) {
    return [[[1]]];
  }

  var solutions = [];

  for (var i = 0; i < n; i++) {
    _.each(findAllRookSolutions(n - 1), function(nMinusOneSol) {
      solutions.push(generateNewSolution(nMinusOneSol, i));
    });
  }

  return solutions;
});

window.generateNewSolution = function(oldSolution, insertionPoint) {
  var newSolution = [];
  var newRook = new Array(oldSolution.length).fill(0).concat(1);

  for (var j = 0; j < oldSolution.length; j++) {
    var row = oldSolution[j].slice().concat(0);
    newSolution.push(row);
  }

  newSolution.splice(insertionPoint, 0, newRook);
  return newSolution;
};


window.colFull = function(colIndex, board) {
  var counter = 0;
  board.forEach(row => {
    counter += row[colIndex];
  }); 
  return counter > 0;
};

window.queenIsSafe = function(row, col, board) {
  var i, j;

  for (i = 0; i < col; i++) {
    if (board[row][i]) {
      return false;
    }
  }

  for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return false;
    }
  }

  for (i = row, j = col; j >= 0 && i < board.length; i++, j--) {
    if (board[i][j]) {
      return false;
    }
  }

  return true;
};

window.findNRooksSolution = function(n, row = 0, col = 0) {
  var solution = makeEmptyMatrix(n);

  for (var i = 0; i < n; i++) {
    while (col < n) {
      if (!colFull(col, solution)) {
        solution[row][col] = 1;
        row = row + 1 === n ? 0 : row + 1;
        col = 0;
        break;
      }
      col++;
    }
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.rotateRight = function(board) {
  var last = board.length - 1;
  return board[0].map(function(col, i) {
    return board.map(function(row) {
      return row[last - i];
    });
  });
};

window.countNRooksSolutions = function(n) {
  var solutions = findAllRookSolutions(n);
  var num = solutions.length;

  console.log('Number of solutions for ' + n + ' rooks:', num);

  return num;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, col = 0) {
  var board = makeEmptyMatrix(n);

  var solveNQueen = function(board, col) {
    if (col >= n) {
      return true;
    }

    for (var i = 0; i < n; i++) {
      if (queenIsSafe(i, col, board)) {
        board[i][col] = 1;
        if (solveNQueen(board, col + 1)) {
          return true;
        }
        board[i][col] = 0;
      }
    }

    return false;
  };

  solveNQueen(board, col);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var rookSolutions = findAllRookSolutions(n);
  var queenSolutions = [];
  
  for (var i = 0; i < rookSolutions.length; i++) {
    var queenSolution = new Board(rookSolutions[i]);
    if (!queenSolution.hasAnyQueensConflicts()) {
      queenSolutions.push(queenSolution);
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', queenSolutions.length);
  return queenSolutions.length;
};

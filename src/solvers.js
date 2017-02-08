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



window.findNRooksSolution = function(n, row = 0, col = 0) {
  var solution = makeEmptyMatrix(n);
  var colFull = function(colIndex, board) {
    var counter = 0;
    board.forEach(row => {
      counter += row[colIndex];
    }); 
    return counter > 0;
  };

  for (var i = 0; i < solution.length; i++) {
    while (col < solution.length) {
      if (!colFull(col, solution)) {
        solution[row][col] = 1;
        row = row + 1 === solution.length ? 0 : row + 1;
        col = 0;
        break;
      }
      col++;
    }
  }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
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
  var uniqueBoards = [];

  // debugger

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var board = findNRooksSolution(n, i, j);
      var board90 = rotateRight(board);
      var board180 = rotateRight(board90);
      var board270 = rotateRight(board180);
      
      var stringified = [
        JSON.stringify(board),
        JSON.stringify(board90),
        JSON.stringify(board180),
        JSON.stringify(board270)
      ];

      var unique = true;

      stringified.forEach(b => {
        if (uniqueBoards.indexOf(b) > -1) {
          unique = false;
        }
      });

      if (unique) {
        uniqueBoards.push(stringified[0]);
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', uniqueBoards.length);
  return uniqueBoards.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

const WINS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin(board, player) {
  for (const combo of WINS) {
    if (combo.every(i => board[i] === player)) return combo;
  }
  return null;
}

function easyMove(board) {
  const empty = board.map((v, i) => v ? -1 : i).filter(i => i >= 0);
  return empty[Math.floor(Math.random() * empty.length)];
}

function minimax(board, isMax, alpha, beta) {
  if (checkWin(board, 'O')) return 10;
  if (checkWin(board, 'X')) return -10;
  if (board.every(c => c)) return 0;
  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      board[i] = 'O';
      best = Math.max(best, minimax(board, false, alpha, beta));
      board[i] = '';
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      board[i] = 'X';
      best = Math.min(best, minimax(board, true, alpha, beta));
      board[i] = '';
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function bestMove(board) {
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = 'O';
    const score = minimax(board, false, -Infinity, Infinity);
    board[i] = '';
    if (score > best) { best = score; move = i; }
  }
  return move;
}

function isDraw(board) {
  return board.every(c => c) && !checkWin(board, 'X') && !checkWin(board, 'O');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WINS, checkWin, easyMove, minimax, bestMove, isDraw };
}

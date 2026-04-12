const { checkWin, easyMove, bestMove, minimax, isDraw, WINS } = require('./game.js');

describe('checkWin', () => {
  test('detects horizontal win', () => {
    const board = ['X','X','X', '','','', '','',''];
    expect(checkWin(board, 'X')).toEqual([0,1,2]);
  });

  test('detects vertical win', () => {
    const board = ['O','','', 'O','','', 'O','',''];
    expect(checkWin(board, 'O')).toEqual([0,3,6]);
  });

  test('detects diagonal win', () => {
    const board = ['X','','', '','X','', '','','X'];
    expect(checkWin(board, 'X')).toEqual([0,4,8]);
  });

  test('detects anti-diagonal win', () => {
    const board = ['','','O', '','O','', 'O','',''];
    expect(checkWin(board, 'O')).toEqual([2,4,6]);
  });

  test('returns null when no win', () => {
    const board = ['X','O','', '','X','', '','','O'];
    expect(checkWin(board, 'X')).toBeNull();
    expect(checkWin(board, 'O')).toBeNull();
  });

  test('returns null on empty board', () => {
    const board = Array(9).fill('');
    expect(checkWin(board, 'X')).toBeNull();
  });
});

describe('isDraw', () => {
  test('detects a draw', () => {
    const board = ['X','O','X', 'X','O','O', 'O','X','X'];
    expect(isDraw(board)).toBe(true);
  });

  test('not a draw when someone won', () => {
    const board = ['X','X','X', 'O','O','', '','',''];
    expect(isDraw(board)).toBe(false);
  });

  test('not a draw when board is incomplete', () => {
    const board = ['X','O','', '','','', '','',''];
    expect(isDraw(board)).toBe(false);
  });
});

describe('easyMove', () => {
  test('returns an empty cell index', () => {
    const board = ['X','O','X', '','','', '','',''];
    const move = easyMove(board);
    expect(move).toBeGreaterThanOrEqual(3);
    expect(board[move]).toBe('');
  });

  test('returns the only empty cell', () => {
    const board = ['X','O','X', 'O','X','O', 'O','X',''];
    expect(easyMove(board)).toBe(8);
  });
});

describe('bestMove', () => {
  test('takes winning move', () => {
    // O has 3,4 and can win at 5. X threats are already blocked.
    const board = ['X','X','O', 'O','O','', 'X','',''];
    expect(bestMove(board)).toBe(5);
  });

  test('blocks opponent winning move', () => {
    // X has 0,1 — about to win at 2. O must block.
    const board = ['X','X','', '','O','', '','',''];
    expect(bestMove(board)).toBe(2);
  });

  test('plays optimally from empty board', () => {
    const board = Array(9).fill('');
    const move = bestMove(board);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
  });
});

describe('minimax', () => {
  test('returns 10 when O already won', () => {
    const board = ['X','X','', 'O','O','O', '','','X'];
    expect(minimax(board, true, -Infinity, Infinity)).toBe(10);
  });

  test('returns -10 when X already won', () => {
    const board = ['X','X','X', 'O','O','', '','',''];
    expect(minimax(board, true, -Infinity, Infinity)).toBe(-10);
  });

  test('returns 0 on a draw', () => {
    const board = ['X','O','X', 'X','O','O', 'O','X','X'];
    expect(minimax(board, true, -Infinity, Infinity)).toBe(0);
  });
});

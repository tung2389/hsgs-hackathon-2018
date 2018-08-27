"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function Shift(a, n) {
  for (let i = 0; i < n; ++i) a.unshift(a.pop());
  return a;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function Check(x, y, n) {
  // Check if x and y exist in area m x n
  if (x >= 0 && x < n && y >= 0 && y < n) return true;
  else return false;
}

const Sudoku = {
  default(props = { size: 3, rate: 2, arrowRate: 2 }) {
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    const size = props.size;
    const rate = props.rate;
    const arrowRate = props.arrowRate;
    const len = Math.floor(size * size);
    let vector = Array.from(new Array(len), (val, index) => index + 1);
    vector = shuffle(vector);
    let board = [];
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        let a = Array.from(vector);
        board.push(a);
        vector = Shift(vector, size);
      }
      vector = Shift(vector, 1);
      //Shift the vector[] by 1 to receive a new one with a different starting element.
    }
    const board2 = board.map(v => v.slice());
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const print = Math.floor(Math.random() * rate);//Marks this as a default item for resetting and different coloring
        board[i][j] = -board[i][j];
        if (print !== 0) board[i][j] = null;
        //We won't print this out, so it's null
      }
    }

    // Save direction in arrow[]
    // 1 - Right, 2 - Down, 3 - Left, 4 - Up
    let arrow = [...Array(len)].map(e => Array(len).fill(null));
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const put = Math.floor(Math.random() * arrowRate);
        if (put === 0 && !board[i][j]) {
          for (let k = 0; k < 4; ++k) {
            if (
              Check(i + dx[k], j + dy[k], len) &&
              board2[i + dx[k]][j + dy[k]] > board2[i][j]
            ) {
              arrow[i][j] = k + 1;
              break;
            }
          }
        }
      }
    }
    return { board, arrow };
  },
  actions: {
    async Place(state, { x, y, val }) {
      let board = state.board;
      const arrow = state.arrow;
      const len = board.length;
      if (val === null) return { board };
      if (val < 0 || val > len) throw new Error("invalid");
      //board, it's an invalid move
      board[x][y] = val;
      //Else, place it as val.
      return { board, arrow };
    },
    async Reset(state) {
      let board = state.board;
      const arrow = state.arrow;
      const len = board.length;
      for (let i = 0; i < len; ++i)
        for (let j = 0; j < len; ++j)
          if (board[i][j] > 0 && board[i][j] <= len) board[i][j] = null;
      //If board[i][j] > 0, then it's a placed item (Default ones
      //are negative)
      return { board, arrow };
    }
  },
  isValid(state) {
    const piles = state.board;
    if (!(piles instanceof Array)) return false;
    for (const pile of piles) if (!(pile instanceof Array)) return false;
    return true;
  },
  isEnding(state) {
    const board = state.board;
    const arrow = state.arrow;
    const len = board.length;
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];

    // Row & column check
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        if (arrow[i][j]) {
          const direct = arrow[i][j] - 1;
          const src = board[i][j];
          const tar = board[i + dx[direct]][j + dy[direct]];
          if (tar === null || src === null) return null;
          if (Math.abs(tar) < Math.abs(src)) return null;
        }
      }
    }

    //Mark all the rows to see if they all contain different numbers
    for (let i = 0; i < len; ++i) {
      let mark = Array(len + 1).fill(false);
      for (let j = 0; j < len; ++j) {
        if (!Number.isInteger(board[i][j])) return null;
        let k = Math.abs(board[i][j]);
        if (mark[k]) return null;
        else mark[k] = true;
      }
      for (let k = 1; k <= len; ++k) if (!mark[k]) return null;
    }
    //Mark all the rows to see if they all contain different numbers
    for (let j = 0; j < len; ++j) {
      let mark = Array(len).fill(false);
      for (let i = 0; i < len; ++i) {
        if (!Number.isInteger(board[i][j])) return null;
        let k = Math.abs(board[i][j]);
        if (mark[k]) return null;
        else mark[k] = true;
      }
      for (let k = 1; k <= len; ++k) if (!mark[k]) return null;
    }
    //Mark all the columns and see if they contain different number

    // Square check
    const small_len = Math.floor(Math.sqrt(len));
    for (let i = 0; i < len; i += small_len) {
      for (let j = 0; j < len; j += small_len) {
        let mark = Array(len).fill(false);
        for (let ti = 0; ti < small_len; ++ti) {
          for (let tj = 0; tj < small_len; ++tj) {
            if (!Number.isInteger(board[i + ti][j + tj])) return null;
            let k = Math.abs(board[i + ti][j + tj]);
            if (mark[k]) return null;
            else mark[k] = true;
          }
        }
        for (let k = 1; k <= len; ++k) if (!mark[k]) return null;
      }
    }

    return "won";
  }
};

exports.default = Sudoku;

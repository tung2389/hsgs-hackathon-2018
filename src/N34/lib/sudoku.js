"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function Shift(a, n) {
  //This function shifts the a vector to the right by n times (Any items that move past the end will be moved back to the beginning)
  for (let i = 0; i < n; ++i) a.unshift(a.pop());
  return a;
}

function shuffle(a) {
  //Randomly shuffles the array a by picking a random element to swap with
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const Sudoku = {
  default(props = { size: 3, rate: 2 }) {
    const size = props.size;
    const rate = props.rate;
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
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const print = Math.floor(Math.random() * rate);
        board[i][j] = -board[i][j];
        //Marks this as a default item for resetting and different coloring
        if (print !== 0) board[i][j] = null;
        //We won't print this out, so it's null
      }
    }
    return { board };
  },
  actions: {
    async Place(state, { x, y, val }) {
      let board = state.board;
      const len = board.length;
      if (val === null) return { board };
      if (val < 0 || val > len) throw new Error("invalid");
      //board, it's an invalid move
      board[x][y] = val;
      //Else, place it as val.
      return { board };
    },
    async Reset(state) {
      let board = state.board;
      const len = board.length;
      for (let i = 0; i < len; ++i)
        for (let j = 0; j < len; ++j)
          if (board[i][j] > 0 && board[i][j] <= len) board[i][j] = null;
      //If board[i][j] > 0, then it's a placed item (Default ones
      //are negative)
      return { board };
    }
  },
  isValid(state) {
    const piles = state.board;
    if (!(piles instanceof Array)) return false;
    for (const pile of piles) if (!(pile instanceof Array)) return false;
    return true;
  },
  isEnding(state) {
    let board = state.board;
    const len = board.length;

    // Row & column check
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

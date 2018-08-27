"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function Shift(a, n) {
  //This function shifts the a vector to the right by n times (Any items that move past the end will be moved back to the beginning)
  for (let i = 0; i < n; ++i) a.unshift(a.pop()); //Insert the end to the beginning and pop it out
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

const Maidel = {
  default(props = { size: 4, rate: 2 }) {
    const size = props.size * 2;
    const rate = props.rate;
    let t_odd = [];
    let t_eve = [];
    //In order to have an odd - even pattern, we create 2 separate arrays, and odd one and an even one.
    for (let i = 0; i <= size; ++i) i % 2 === 1 ? t_odd.push(i) : t_eve.push(i);
    //Randomly shuffles them
    t_odd = shuffle(t_odd);
    t_eve = shuffle(t_eve);

    let fir = [];
    //Insert them into our first row. The first row will have an odd number at the beginning
    for (let i = 0; i < t_odd.length; ++i) {
      fir.push(t_odd[i]);
      fir.push(t_eve[i]);
    }

    let odd = [];
    let eve = [];
    //Now we do the same as above, but odd contains arrays that start with odd elements while eve do the other.
    for (let i = 0; i < size; ++i) {
      const a = Array.from(fir);
      if (i % 2 === 0) odd.push(a);
      else eve.push(a);
      fir = Shift(fir, 1);
      //Shift the fir array by 1 to receive a new one with a different starting element.
    }
    odd = shuffle(odd);
    eve = shuffle(eve);
    //Randomly shuffles them again
    let board = [];
    for (let i = 0; i < odd.length; ++i) {
      board.push(odd[i]);
      if (eve[i] !== undefined) board.push(eve[i]);
      //This step is the same as above when creating the fir array
    }

    // console.table(board);

    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        const print = Math.floor(Math.random() * rate);
        //This determines if the element at row i, column j is printed or not
        board[i][j] = -board[i][j];
        //Marks this as a default item for resetting and different coloring
        if (print !== 0) board[i][j] = null; //We won't print this out, so it's null
      }
    }
    // console.table(board);
    return { board };
  },
  actions: {
    async Place(state, { x, y, val }) {
      let board = state.board;
      const size = board.length;
      let temp=x+y;
      if (temp%2===0) if (val%2===0) throw new Error("invalid"); //This check ensures the white spots contain odd numbers
      if (temp%2===1) if (val%2===1) throw new Error("invalid"); //This check ensures the black spots contain even numbers
      if (val === null) return { board };
      if (val < 0 || val > size) throw new Error("invalid"); //If the inserted value is smaller than 0 or bigger than the size of the
      //board, it's an invalid move
      board[x][y] = val;
      //Else, place it as val.
      return { board };
    },
    async Reset(state) {
      let board = state.board;
      const size = board.length;
      for (let i = 0; i < size; ++i)
        for (let j = 0; j < size; ++j)
          if (board[i][j] > 0 && board[i][j] <= size) board[i][j] = null; //If board[i][j] > 0, then it's a placed item (Default ones
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
    const board = state.board;
    const size = board.length;
    for (let i = 0; i < size; ++i) {
      let mark = Array(size + 1).fill(false);
      for (let j = 0; j < size; ++j) {
        if (!Number.isInteger(board[i][j])) return null;
        let k = Math.abs(board[i][j]);
        if (mark[k]) return null;
        else mark[k] = true;
      }
      for (let k = 1; k <= size; ++k) if (!mark[k]) return null;
    }
    //Mark all the rows to see if they all contain different numbers
    for (let j = 0; j < size; ++j) {
      let mark = Array(size).fill(false);
      for (let i = 0; i < size; ++i) {
        if (!Number.isInteger(board[i][j])) return null;
        let k = Math.abs(board[i][j]);
        if (mark[k]) return null;
        else mark[k] = true;
      }
      for (let k = 1; k <= size; ++k) if (!mark[k]) return null;
    }
    //Mark all the columns and see if they contain different numbers

    for (let i = 0; i < size; ++i) {
      for (let j = 1; j < size; ++j) {
        if ((board[i][j] + board[i][j - 1]) % 2 === 0) return null;
      }
    }
    //Extra check to see if the board actually follows an alternating order.
    for (let j = 0; j < size; ++j) {
      for (let i = 1; i < size; ++i) {
        if ((board[i][j] + board[i - 1][j]) % 2 === 0) return null;
      }
    }

    return "won";
  }
};

exports.default = Maidel;

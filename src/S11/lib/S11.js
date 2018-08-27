"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function generateState(N) {
  let step = 0;
  let board = [...Array(N + 1)].map(v => Array(N + 1).fill(0));
  let bit = [...Array(1 << N)].fill(0),
    sum = [];

  for (let i = N; i > 0; i--)
    for (let j = 1; j < i; j++)
      (board[i][j] = Math.floor(Math.random() * 200) - 100),
        (board[j][i] = -board[i][j]);

  for (let i = 1; i <= N; i++) {
    let S = 0;
    for (let j = 1; j <= N; j++) S += board[i][j];
    sum.push(S);
  }

  for (let i = 1; i <= N; i++) {
    if (sum[i - 1] !== 0) {
      board[N][i] += sum[i - 1];
      sum[N - 1] += sum[i - 1];
      board[i][N] -= sum[i - 1];
      sum[i - 1] = 0;
    }
  }

  let column = Math.ceil(N / 3);
  let col = [...Array(column)].map(v => Array());

  for (let i = 1; i <= column; i++) col[i - 1].push(i);
  for (let i = column + 1; i <= N; i++)
    col[Math.floor(Math.random() * column)].push(i);

  for (let i = 0; i < column; i++) {
    let num = Math.floor(Math.random() * 10) + 5;
    while (num--) {
      let a = col[i][Math.floor(Math.random() * col[i].length)];
      let b = col[i][Math.floor(Math.random() * col[i].length)];
      let c = Math.floor(Math.random() * 100);
      board[a][b] += c;
      sum[a - 1] += c;
      board[b][a] -= c;
      sum[b - 1] -= c;
    }
  }

  for (let mask = 1; mask < 1 << N; mask++) {
    let S = 0;
    bit[mask] = -1000000000;
    for (let i = 0; i < N; i++) {
      if (mask & (1 << i)) S += sum[i];
    }
    if (S === 0) bit[mask] = 1;
    for (let i = mask; i > 0; i = (i - 1) & mask) {
      if (bit[mask] < bit[i] + bit[i ^ mask])
        bit[mask] = bit[i] + bit[i ^ mask];
    }
  }

  let expectedstep = N - bit[(1 << N) - 1];
  return { board, step, expectedstep, N };
}

const S11 = {
  default(props = { _N: 4 }) {
    while (1) return generateState(props._N);
  },

  actions: {
    async giveMoney(state, { A, B, X }) {
      let board = state.board.map(v => v.slice());
      let step = state.step;
      let expectedstep = state.expectedstep;
      let N = state.N;

      if (A < 1 || A > N || B < 1 || B > N) throw new Error("Invalid Input");
      if (step >= 2 * N) throw new Error("You have used too much steps");
      step++;
      board[A][B] -= Number(X);
      board[B][A] += Number(X);
      return { board, step, expectedstep, N };
    },

    async StartaNewGame(state) {
      let N = state.N;
      return generateState(N);
    }
  },

  isValid(state) {
    let board = state.board.map(v => v.slice());
    let step = state.step;
    let N = state._N;
    for (let i = 1; i <= N; i++) if (board[i][i] !== 0) return false;
    for (let i = 1; i <= N; i++)
      for (let j = 1; j < i; j++) {
        if (board[i][j] + board[j][i] !== 0) return false;
      }
    return true;
  },

  isEnding(state) {
    let N = state.N;
    let board = state.board;
    let step = state.step;
    let expectedstep = state.expectedstep;
    for (let i = 1; i <= N; i++) {
      let sum = 0;
      for (let j = 1; j <= N; j++) {
        sum += board[i][j];
      }
      if (sum !== 0) return null;
    }
    if (step <= expectedstep) return "won";
    if (step <= expectedstep + 2) return "won1";
    return "lose";
  }
};
exports.default = S11;

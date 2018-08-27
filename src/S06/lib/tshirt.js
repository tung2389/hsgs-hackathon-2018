"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function check(x, y, m, n) {
  // check if the condidate is valid
  if (x >= 0 && x < n && y >= 0 && y < m) return true;
  return false;
}

function shuffle(a) {
  // random the array
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const Tshirt = {
  default(props = { m: 6, n: 6 }) {
    // n cot, m hang
    // n <= m
    let m = props.m;
    let n = props.n;
    let doInvert = false;
    if (m > n) {
      m = props.n;
      n = props.m;
      doInvert = true;
    }

    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];
    let board = [];
    // build a valid board and random all the columns and rows
    let first = Array.from(new Array(m), (val, index) => index + 1);
    first = shuffle(first);

    for (let i = 0; i < n; ++i) {
      let a = first.map(v => v);
      board.push(a);
      first.unshift(first.pop());
    }
    board = shuffle(board);
    // erase random cells which satisfy the conditions
    let mark = [...Array(n)].map(e => Array(m).fill(false));
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < m; ++j) {
        let flag = false;
        for (let t = 0; t < 4; ++t)
          if (check(i + dx[t], j + dy[t], m, n) && mark[i + dx[t]][j + dy[t]]) {
            flag = true;
            break;
          }
        if (check(i - 1, j - 1, m, n) && flag === false)
          flag = mark[i - 1][j - 1]; // Ensure the board can be solved
        if (check(i + 1, j - 1, m, n) && flag === false)
          flag = mark[i + 1][j - 1];
        if (!flag) {
          const ran = Math.floor(Math.random() * 5);
          if (ran > 2) {
            board[i][j] = Math.floor(Math.random() * m) + 1;
            mark[i][j] = true;
          }
        }
      }
    }

    if (doInvert) {
      let new_board = [...Array(m)].map(e => Array(n).fill(0));
      for (let j = 0; j < m; ++j) {
        for (let i = 0; i < n; ++i) {
          new_board[j][i] = board[i][j];
        }
      }
      console.table(new_board);
      board = Array.from(new_board);
    }

    const selection = [...Array(n)].map(e => Array(m).fill(false));

    return { board, selection };
  },
  actions: {
    async choose(state, { x, y }) {
      const board = state.board;
      let selection = state.selection;
      const n = board.length;
      const m = board[0].length;
      const dx = [-1, 0, 0, 1];
      const dy = [0, -1, 1, 0];

      let cant = false;
      for (let k = 0; k < 4; ++k) {
        if (
          check(x + dx[k], y + dy[k], m, n) &&
          selection[x + dx[k]][y + dy[k]]
        )
          throw new Error("num_lined");
      }

      selection[x][y] = !selection[x][y];
      return { board, selection };
    },
    async reset(state) {
      const board = state.board;
      let selection = state.selection;
      const n = selection.length;
      const m = selection[0].length;
      for (let i = 0; i < n; ++i)
        for (let j = 0; j < m; ++j)
          if (selection[i][j]) selection[i][j] = false;
      return { board, selection };
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
    const selection = state.selection;
    const n = board.length;
    const m = board[0].length;
    let x0 = 0,
      y0 = 0;
    // check the first condition : each column and row is a permutation of (1..n)
    const kt = [...Array(n)].map(e => Array(m).fill(false));
    for (let i = 0; i < n; ++i) {
      let mark = Array(m).fill(false);
      for (let j = 0; j < m; ++j) {
        if (!selection[i][j]) {
          x0 = i;
          y0 = j;
          if (mark[board[i][j]]) return null;
          else mark[board[i][j]] = true;
        } else kt[i][j] = true;
      }
    }
    for (let j = 0; j < m; ++j) {
      let mark = Array(n).fill(false);
      for (let i = 0; i < n; ++i) {
        if (!selection[i][j]) {
          if (mark[board[i][j]]) return null;
          else mark[board[i][j]] = true;
        }
      }
    }
    // We floodfill to check the the second conditions : The Left cells are connected
    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];
    let tmp = { x: x0, y: y0 };
    let checkop = [];
    checkop.push(tmp);
    console.table(kt);
    while (checkop.length > 0) {
      (x0 = checkop[0].x), (y0 = checkop[0].y);
      checkop.shift();
      //
      kt[x0][y0] = true;
      for (let i = 0; i < 4; ++i)
        if (check(x0 + dx[i], y0 + dy[i], m, n)) {
          let x1 = x0 + dx[i],
            y1 = y0 + dy[i];
          //console.log('??', x1, y1, kt[x1][y1]);
          if (kt[x1][y1] === false) {
            (tmp.x = x1), (tmp.y = y1);
            checkop.push({ x: x1, y: y1 });
          }
        }
    }
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) if (kt[i][j] === false) return null; // if not satisfy
    return "won";
  }
};

exports.default = Tshirt;

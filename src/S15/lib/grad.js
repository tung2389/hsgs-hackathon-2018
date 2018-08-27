"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function check(x, y, m, n) {
  // Check if x and y exist in area m x n
  if (x >= 0 && x < n && y >= 0 && y < m) return true;
  return false;
}

const Grad = {
  default(props = { m: 6, n: 6 }) {
    // n cot, m hang
    const m = props.m;
    const n = props.n;
    let cnti = Array(n).fill(0);
    let cntj = Array(m).fill(0);

    let field = [];
    // Generate n x m 2d array: 0
    let gentent = [...Array(n)].map(e => Array(m).fill(0));

    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];
    const dx2 = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy2 = [-1, 0, 1, -1, 1, -1, 0, 1];

    // Push value {"tree", null} into field[]
    for (let i = 0; i < n; ++i) {
      let subarray = [];
      for (let j = 0; j < m; ++j) {
        const treehere = Math.floor(Math.random() * 4);
        if (treehere === 0) subarray.push("tree");
        else subarray.push(null);
      }
      field.push(subarray);
    }

    // Randomly put tent into field[]
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        if (field[i][j] === null) {
          const tenthere = Math.floor(Math.random() * 5);
          if (tenthere !== 0) {
            let findtree = false;
            for (let iter = 0; iter < 4; ++iter)
              if (
                check(i + dx[iter], j + dy[iter], m, n) &&
                field[i + dx[iter]][j + dy[iter]] === "tree"
              )
                findtree = true;

            if (findtree) {
              let alreadytent = false;
              for (let k = 0; k < 8; ++k)
                if (
                  check(i + dx2[k], j + dy2[k], m, n) &&
                  gentent[i + dx2[k]][j + dy2[k]] === 1
                )
                  alreadytent = true;
              if (!alreadytent) gentent[i][j] = 1;
            }
          }
        }
      }
    
    // Count number of tents in columns & rows
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        cnti[i] += gentent[i][j];
        cntj[j] += gentent[i][j];
      }

    // Example result
    // const field = [
    //   [null, null, null, null, "tree", null],
    //   [null, null, "tree", null, null, "tree"],
    //   ["tree", null, null, null, null, null],
    //   [null, null, "tree", null, "tree", null],
    //   [null, null, null, null, null, null],
    //   [null, null, null, "tree", null, "tree"]
    // ];
    // const cnti = [2, 1, 1, 2, 1, 1];
    // const cntj = [1, 1, 2, 1, 0, 3];

    return { field, cnti, cntj };
  },
  actions: {
    async place(state, { x, y, check_tent }) {
      let field = state.field;
      const n = field.length;
      const m = field[0].length;
      const cnti = state.cnti;
      const cntj = state.cntj;

      const dx = [-1, 0, 0, 1];
      const dy = [0, -1, 1, 0];
      const dx2 = [-1, -1, -1, 0, 0, 1, 1, 1];
      const dy2 = [-1, 0, 1, -1, 1, -1, 0, 1];

      if (field[x][y] === "tree") throw new Error("tree_present");

      if (field[x][y] === "tent") {
        field[x][y] = null;
        return { field, cnti, cntj };
      }

      // Check validtree
      let validtree = false;
      for (let k = 0; k < 4; ++k)
        if (
          check(x + dx[k], y + dy[k], m, n) &&
          field[x + dx[k]][y + dy[k]] === "tree"
        )
          validtree = true;
      if (!validtree) throw new Error("no_adj_tree");

      // Check tentaround
      let tentaround = false;
      for (let k = 0; k < 8; ++k)
        if (
          check(x + dx2[k], y + dy2[k], m, n) &&
          field[x + dx2[k]][y + dy2[k]] === "tent"
        )
          tentaround = true;
      if (tentaround) throw new Error("near_tent");

      // Check tent left
      if (check_tent) {
        let tent_i = 0;
        for (let j = 0; j < m; ++j) {
          if (field[x][j] === "tent") ++tent_i;
          if (tent_i >= cnti[x]) throw new Error("invalid_move_col");
        }
        let tent_j = 0;
        for (let i = 0; i < n; ++i) {
          if (field[i][y] === "tent") ++tent_j;
          if (tent_j >= cntj[y]) throw new Error("invalid_move_row");
        }
      }

      field[x][y] = "tent";
      console.table(field);
      console.table(cnti);
      console.table(cntj);
      return { field, cnti, cntj };
    },
    async reset(state) {
      let field = state.field;
      const n = field.length;
      const m = field[0].length;
      const cnti = state.cnti;
      const cntj = state.cntj;

      for (let i = 0; i < n; ++i)
        for (let j = 0; j < m; ++j)
          if (field[i][j] === "tent") field[i][j] = null;
      // console.table(field);
      return { field, cnti, cntj };
    }
  },
  isValid(state) {
    const piles = state.field;
    if (!(piles instanceof Array)) return false;
    for (const pile of piles) if (!(pile instanceof Array)) return false;
    return true;
  },
  isEnding(state) {
    const field = state.field;
    const n = field.length;
    const m = field[0].length;
    const cnti = Array(n).fill(0);
    const cntj = Array(m).fill(0);
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j)
        if (field[i][j] === "tent") {
          ++cnti[i];
          ++cntj[j];
        }

    // console.log(cnti);
    // console.log(cntj);
    for (let i = 0; i < n; ++i) if (cnti[i] !== state.cnti[i]) return null;
    for (let j = 0; j < m; ++j) if (cntj[j] !== state.cntj[j]) return null;
    return "won";
  }
};

exports.default = Grad;

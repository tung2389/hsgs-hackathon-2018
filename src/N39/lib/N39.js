"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function random(N) {
  return Math.floor(Math.random() * N);
}

function random_shuffle(arr) {
  let N = arr.length;
  
  for (let i = 0; i < (N - 1); ++i) {
    let j = i + random(N - i);
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
}

function genBoard(N) {
  let board = [];
  for (let i = 0; i < N; ++i) {
    let arr = [];
    for (let j = 0; j < N; ++j) {
      arr.push((i + j) % N);
    }
    board.push(arr);
  }

  let arrCol = [];
  let arrRow = [];
  for (let i = 0; i < N; ++i) {
    arrCol.push(i), arrRow.push(i);
  }
  random_shuffle(arrCol);
  random_shuffle(arrRow);

  let board2 = [];
  for (let i = 0; i < N; ++i) {
    board2.push(Array(N));
  }

  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      board2[i][j] = board[arrRow[i]][arrCol[j]];
    }
  }

  return board2;
}

const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function checkConnected(N, block) {
  let visit = [];
  for(let i = 0; i < N; ++i) {
    visit.push(Array(N).fill(0));
  }
  let root = [-1, -1];
  for(let i = 0; i < N; ++i) {
    for(let j = 0; j < N; ++j) {
      if(block[i][j] == 1) continue;
      root = [i, j];
    }
  }
  let dfs = [];
  dfs.push(root);
  visit[root[0]][root[1]] = 1;
  while(dfs.length > 0) {
    let u = dfs.pop();
    for(let i = 0; i < 4; ++i) {
      let x = u[0] + dir[i][0];
      let y = u[1] + dir[i][1];
      if(x < 0 || y < 0 || x >= N || y >= N) continue;
      if(block[x][y] == 1) continue;
      if(visit[x][y] == 1) continue;
      visit[x][y] = 1;
      dfs.push([x, y]);
    }
  }
  for(let i = 0; i < N; ++i) {
    for(let j = 0; j < N; ++j) {
      if(block[i][j] == 1) continue;
      if(visit[i][j] == 1) continue;
      return 0;
    }
  }
  return 1;
}

function debug(board) {
  let N = board.length;
  for(let i = 0; i < N; ++i) {
    console.log(JSON.stringify(board[i]));
  }
}

const N39 = {
  default({N}) {
    let board = genBoard(N);
    debug(board);
    let lim = 1 + random(N * N - 1);
    let block = [];
    for(let i = 0; i < N; ++i) {
      block.push(Array(N).fill(0));
    }
    let cntBlock = 0;
    while(cntBlock <= lim) {
      let cand = [];
      for(let i = 0; i < N; ++i) {
        for(let j = 0; j < N; ++j) {
          if(block[i][j] == 1) continue;
          let nearBlock = 0;
          for(let k = 0; k < 4; ++k) {
            let x = i + dir[k][0];
            let y = j + dir[k][1];
            if(x < 0 || y < 0 || x >= N || y >= N) continue;
            if(block[x][y] == 1) nearBlock = 1;
          }
          if(nearBlock == 1) continue;
          block[i][j] = 1;
          if(checkConnected(N, block)) {
            cand.push([i, j]);
          }
          block[i][j] = 0;
        }
      }
      if(cand.length == 0) break;
      random_shuffle(cand);
      block[cand[0][0]][cand[0][1]] = 1;
      cntBlock++;
    }
    debug(block);
    let rowValue = [];
    let colValue = [];
    for(let i = 0; i < N; ++i) {
      rowValue.push([]);
      colValue.push([]);
    }
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < N; ++j) {
        if(block[i][j] == 1) continue;
        rowValue[i].push(board[i][j]);
        colValue[j].push(board[i][j]);
      }
    }
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < N; ++j) {
        if(block[i][j] == 0) continue;
        let id = random(rowValue[i].length);
        board[i][j] = rowValue[i][id];
        if(random(2)) {
          id = random(colValue[j].length);
          board[i][j] = colValue[j][id];
        }
      }
    }
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < N; ++j) {
        block[i][j] = 0;
      }
    }
    return {
      board: board,
      block: block
    };
  },

  actions: {
    async restart(state) {
      let N = state.board.length;
      let board = state.board.map(v => v.slice());
      let block = state.block.map(v => v.slice());
      for(let i = 0; i < N; ++i) {
        for(let j = 0; j < N; ++j) {
          block[i][j] = 0;
        }
      }
      return {
        board: board,
        block: block
      };
    },

    async move(state, {row, col}) {
      let N = state.board.length;
      let board = state.board.map(v => v.slice());
      let block = state.block.map(v => v.slice());
      block[row][col] = !block[row][col];
      for(let i = 0; i < 4; ++i) {
        let x = row + dir[i][0];
        let y = col + dir[i][1];
        if(x < 0 || y < 0 || x >= N || y >= N) continue;
        if(block[x][y] == 1 && block[row][col] == 1) {
          block[row][col] = !block[row][col];
          throw new Error("Có ô kề cạnh ô được chọn bị xóa");
        }
      }
      if(checkConnected(N, block) == 0) {
        block[row][col] = !block[row][col];
        throw new Error("Các ô bị xóa phải tạo thành một miền liên tục không ngắt quãng");
      }
      return {
        board: board,
        block: block
      };
    }
  },

  isValid(state) {
  // nothing to do here ?
  },

  isEnding(state) {
    let N = state.board.length;
    let board = state.board.map(v => v.slice());
    let block = state.block.map(v => v.slice());
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < N; ++j) {
        if(block[i][j] == 1) continue;
        for(let k = 0; k < N; ++k) {
          if(block[i][k] == 1) continue;
          if(j == k) continue;
          if(board[i][j] == board[i][k]) return null;
        }
        for(let k = 0; k < N; ++k) {
          if(block[k][j] == 1) continue;
          if(i == k) continue;
          if(board[i][j] == board[k][j]) return null;
        }
      }
    }
    return "won";
  }
}

exports.default = N39;
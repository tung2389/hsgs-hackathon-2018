"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function check(x, y, N, isboard){
    if (x < 1 || x > N || y < 1 || y > N) return false;
    if (isboard !== 1){
        if (x + y > (3 * N + 1) / 2 || x + y < (N + 3) / 2) return false;
        if (x - y > (N - 1) / 2 || x - y < (1 - N) / 2) return false;
    }
    return true;
};

function generateState(N, isboard, time){ // sinh ra một state mới
    let board = [...Array(N+5)].map(v => Array(N+5).fill(0));
    let chosenx = [], choseny = [];
    for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++){
        board[i][j] = Math.floor(Math.random() * 10);
    }
    let length = Math.floor(Math.random() * 3) + (N-3) / 2; if (length === 1) length = 2;
    let direction = Math.floor(Math.random() * 8);
    let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
    let dy = [0, 1, 1, 1, 0, -1, -1, -1];
    let X = [], Y = [], lose = 0;
    let ans = "";
    let res = "";
    for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++){
        if (check(i, j, N, isboard) === true && 
            check(  i+Number(dx[direction]*(length-1)), 
                    j+Number(dy[direction]*(length-1)), 
                    N, isboard) === true)
            X.push(i), Y.push(j);
    }
    let a = Math.floor(Math.random() * X.length), x = X[a], y = Y[a];
    for (let i = 0; i < length; i++){
        ans = ans + board[x+dx[direction]*i][y+dy[direction]*i];
    }
    return {N, board, ans, chosenx, choseny, isboard, res, time, lose};
}

const N11 = {

  default(props = { _N : 4, time : 10}){
    return generateState(props._N, props.isboard, props.time);
  },

  actions: {

    async move(state, {X, Y}) { // chọn ô X, Y
        X = Number(X); Y = Number(Y);
        let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
        let dy = [0, 1, 1, 1, 0, -1, -1, -1];
        let chosenx = state.chosenx;
        let choseny = state.choseny;
        let board = state.board.map(v => v.slice());
        let ans = state.ans;
        let N = state.N;
        let isboard = state.isboard;
        let res = state.res;
        let time = state.time;
        let lose = state.lose;

        if (check(X, Y, N, isboard) === false) throw new Error("Invalid input. Những ô bạn chọn bị lỗi");
        
        for (let i = 0; i < res.length; i++){
            if (X == chosenx[i] && Y == choseny[i]) throw new Error("Invalid input. Ô bạn chọn đã được chọn rồi");
        }

        if (res.length === 1) {
            let val = false;
            for (let i = 0; i <= 7; i++){
                if (chosenx[0] + dx[i] === X && choseny[0] + dy[i] === Y) val = true;
            }
            if (val === false) throw new Error("Invalid input. Các ô bạn chọn phải liên tiếp");
        }

        if (res.length >= 2){
            let cur = res.length;
            if (X + chosenx[cur-2] !== 2*chosenx[cur-1] || Y + choseny[cur-2] !== 2*choseny[cur-1]) 
                throw new Error("Invalid input. Các ô bạn chọn không liên tiếp");
        }

        chosenx[res.length] = X;
        choseny[res.length] = Y;

        res = res + board[X][Y];
        return {N, board, ans, chosenx, choseny, isboard, res, time, lose};
    },

    async StartaNewGame(state){ // bắt đầu game mới
      return generateState(state.N, state.isboard, state.time);
    },

    async lose(state){ // in ra solution (đặt bằng thua luôn)
        let chosenx = state.chosenx.map
        let choseny = state.choseny.map
        let board = state.board.map(v => v.slice());
        let ans = state.ans;
        let N = state.N;
        let isboard = state.isboard;
        let res = state.res;
        let time = state.time;
        let lose = state.lose;
        lose = 1;
        return {N, board, ans, chosenx, choseny, isboard, res, time, lose};
    }
  },

  isValid(state) {
    let board = state.board.map(v => v.slice());
    let N = state.N;
    for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++) if (board[i][j] < 0 || board[i][j] > 9)  return false;
    return true;
  },

  isEnding(state) {
      let ans = state.ans;
      let res = state.res;
      let lose = state.lose;
      if (lose === 1) return "TLE"; 
      if (res.length < ans.length) return null;
      if (res !== ans) return "lose";
      return "won";
  }
}
exports.default = N11;

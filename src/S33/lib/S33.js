"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function generateState(N){ 
    let board = [...Array(N+5)].map(v => Array(N+5).fill(0)); // bảng giá trị các ô
    let sol = [...Array(N+5)].map(v => Array(N+5).fill(0)); // bảng domino 1-2 là domino trái-phải, 3-4 là domino trên dưới
    let ck = [...Array(N+5)].map(v => Array(N+5).fill(0)); // ô (i, j) = 1 tức là đã có domino (i, j)
    let cnt = Math.floor(Math.random() * 100 + 100);
    
    for (let i = 1; i <= N; i++) for (let j = 1; j <= N+1; j++){
        if (N % 2 === 0) sol[i][j] = 4 - i % 2;
        else sol[i][j] = 2 - j % 2;
    }
    
    for (; cnt > 0; cnt--){
        // random đổi một ô 2x2 gồm 2 domino thì thay đổi từ trên-dưới thành trái-phải hoặc ngược lại
        let X = [], Y = [];
        for (let i = 1; i < N; i++) for (let j = 1; j <= N; j++){
            if (sol[i][j] === 3 && sol[i][j+1] === 3) X.push(i), Y.push(j);
            if (sol[i][j] === 1 && sol[i+1][j] === 1) X.push(i), Y.push(j);
        }

        let num = Math.floor(Math.random() * X.length);
        if (sol[X[num]][Y[num]] === 1){
            sol[X[num]  ][Y[num]  ] = 3;
            sol[X[num]+1][Y[num]  ] = 4;
            sol[X[num]  ][Y[num]+1] = 3;
            sol[X[num]+1][Y[num]+1] = 4;
        }
        else{
            sol[X[num]  ][Y[num]  ] = 1;
            sol[X[num]+1][Y[num]  ] = 1;
            sol[X[num]  ][Y[num]+1] = 2;
            sol[X[num]+1][Y[num]+1] = 2;
        }
    }

    for (let x = 1; x <= N; x++) for (let y = 1; y <= N+1; y++){
        // random các giá trị của các domino
        if (sol[x][y] % 2 === 0) continue;
        let X = [], Y = [];
        
        for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++){
            if (ck[i][j] === 0) X.push(i), Y.push(j);
        }
        
        let num = Math.floor(Math.random() * X.length);

        if (sol[x][y] === 1){
            board[x][y]   = X[num];
            board[x][y+1] = Y[num];
        }
        else{
            board[x][y]   = X[num];
            board[x+1][y] = Y[num];
        }

        ck[X[num]][Y[num]] = 1;
        ck[Y[num]][X[num]] = 1;
    }
    
    let bo = [...Array(N+1)].map(v => Array(N+2).fill(0)), lose = 0;
    ck = [...Array(N+2)].map(v => Array(N+2).fill(0));

    let cur = 0, X = 0, Y = 0;

    return {N, board, bo, sol, ck, cur, X, Y, lose};
}

const S33 = {

  default(props = { _N : 4}){
    return generateState(props._N);
  },

  actions: {

    async choose(state, {X, Y}) {
        let N = state.N;
        let board = state.board.map(v => v.slice()); // bảng giá trị các ô
        let bo = state.bo.map(v => v.slice()); // bảng domino
        let cur = state.cur; // đang ở ô thứ nhất hay thứ 2 của domino
        let ck = state.ck.map(v => v.slice()); // đã có domino (i, j) chưa
        let sol = state.sol, lose = state.lose;

        if (cur === 0 && bo[X][Y] !== 0) { // chọn một ô chưa được chọn
            if (bo[X][Y] === 1) {
                ck[board[X][Y]][board[X][Y+1]] = 0;
                ck[board[X][Y+1]][board[X][Y]] = 0;
                bo[X][Y] = 0, bo[X][Y+1] = 0, Y++;
            }
            if (bo[X][Y] === 2) {
                ck[board[X][Y]][board[X][Y-1]] = 0;
                ck[board[X][Y-1]][board[X][Y]] = 0;
                bo[X][Y] = 0, bo[X][Y-1] = 0, Y--;
            }
            if (bo[X][Y] === 3) {
                ck[board[X][Y]][board[X+1][Y]] = 0;
                ck[board[X+1][Y]][board[X][Y]] = 0;
                bo[X][Y] = 0, bo[X+1][Y] = 0, X++;
            }
            if (bo[X][Y] === 4) {
                ck[board[X][Y]][board[X-1][Y]] = 0;
                ck[board[X-1][Y]][board[X][Y]] = 0;
                bo[X][Y] = 0, bo[X-1][Y] = 0, X--;
            }
            cur = 1;
            return {N, board, bo, sol, ck, cur, X, Y, lose};
        }

        if (cur === 1 && state.X === X && state.Y === Y){ // xóa ô vừa chọn
            cur = 0;
            return {N, board, bo, sol, ck, cur, X, Y, lose};
        }

        if (cur === 1){
            if ((bo[X][Y] === 0 && 
                ((state.X === X && (state.Y === Y-1 || state.Y === Y+1)) 
                || ((state.X === X-1 || state.X === X+1) && state.Y === Y))) === false){
                    cur ^= 1;
                if (bo[X][Y] !== 0) {
                    if (bo[X][Y] === 1) {
                        ck[board[X][Y]][board[X][Y+1]] = 0;
                        ck[board[X][Y+1]][board[X][Y]] = 0;
                        bo[X][Y] = 0, bo[X][Y+1] = 0, Y++;
                    }
                    if (bo[X][Y] === 2) {
                        ck[board[X][Y]][board[X][Y-1]] = 0;
                        ck[board[X][Y-1]][board[X][Y]] = 0;
                        bo[X][Y] = 0, bo[X][Y-1] = 0, Y--;
                    }
                    if (bo[X][Y] === 3) {
                        ck[board[X][Y]][board[X+1][Y]] = 0;
                        ck[board[X+1][Y]][board[X][Y]] = 0;
                        bo[X][Y] = 0, bo[X+1][Y] = 0, X++;
                    }
                    if (bo[X][Y] === 4) {
                        ck[board[X][Y]][board[X-1][Y]] = 0;
                        ck[board[X-1][Y]][board[X][Y]] = 0;
                        bo[X][Y] = 0, bo[X-1][Y] = 0, X--;
                    }
                    cur = 1;
                    return {N, board, bo, sol, ck, cur, X, Y, lose};
                }
            }
            else{
                if (state.X === X && state.Y === Y-1){
                    if (ck[board[X][Y]][board[X][Y-1]] === 1) throw new Error ("Domino (" + board[X][Y] + ", " + board[X][Y-1] + ") đã xuất hiện");
                    bo[X][Y-1] = 1;
                    bo[X][Y] = 2;
                    ck[board[X][Y]][board[X][Y-1]] = 1;
                    ck[board[X][Y-1]][board[X][Y]] = 1;
                }
                if (state.X === X && state.Y === Y+1){
                    if (ck[board[X][Y]][board[X][Y+1]] === 1) throw new Error ("Domino (" + board[X][Y] + ", " + board[X][Y+1] + ") đã xuất hiện");
                    bo[X][Y+1] = 2;
                    bo[X][Y] = 1;
                    ck[board[X][Y]][board[X][Y+1]] = 1;
                    ck[board[X][Y+1]][board[X][Y]] = 1;
                }
                if (state.Y === Y && state.X === X-1){
                    if (ck[board[X][Y]][board[X-1][Y]] === 1) throw new Error ("Domino (" + board[X][Y] + ", " + board[X-1][Y] + ") đã xuất hiện");
                    bo[X-1][Y] = 3;
                    bo[X][Y] = 4;
                    ck[board[X][Y]][board[X-1][Y]] = 1;
                    ck[board[X-1][Y]][board[X][Y]] = 1;
                }
                if (state.Y === Y && state.X === X+1){
                    if (ck[board[X][Y]][board[X+1][Y]] === 1) throw new Error ("Domino (" + board[X][Y] + ", " + board[X+1][Y] + ") đã xuất hiện");
                    bo[X+1][Y] = 4;
                    bo[X][Y] = 3;
                    ck[board[X][Y]][board[X+1][Y]] = 1;
                    ck[board[X+1][Y]][board[X][Y]] = 1;
                }
            }
        }

        cur ^= 1;

        return {N, board, bo, sol, ck, cur, X, Y, lose};
    },

    async StartaNewGame(state){
      let N = state.N;
      return generateState(N);
    },

    async Solution(state){
        let N = state.N;
        let board = state.board.map(v => v.slice()); // bảng giá trị các ô
        let bo = state.sol.map(v => v.slice()); // bảng domino
        let cur = state.cur; // đang ở ô thứ nhất hay thứ 2 của domino
        let ck = state.ck.map(v => v.slice()); // đã có domino (i, j) chưa
        let X = state.X, Y = state.Y;
        let sol = state.sol;
        let lose = state.lose; lose = 1;

        return {N, board, bo, sol, ck, cur, X, Y, lose};
    }
  },

  isValid(state) {
    let N = state.N;
    let bo = state.bo.map(v => v.slice());
    let cur = state.cur;

    if (cur < 0 || cur > 2) return false; 
    
    for (let i = 1; i <= N; i++) for (let j = 1; j <= N+1; j++){
        if (bo[i][j] === 1 && bo[i][j+1] !== 2) return false; 
        if (bo[i][j] === 3 && bo[i+1][j] !== 4) return false; 
    }

    return true;
  },

  isEnding(state) {
    let N = state.N;
    let bo = state.bo.map(v => v.slice());

    if (state.lose === 1) return "lose";

    for (let i = 1; i <= N; i++) for (let j = 1; j <= N+1; j++){
        if (bo[i][j] === 0) {
            return null;
        }
    }

    return "won";
  }
}
exports.default = S33;

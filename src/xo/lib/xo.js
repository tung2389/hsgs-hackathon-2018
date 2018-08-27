"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const xo = {
    default( props = {row: 10, col: 10}){
        const Board = new Array() , undo = [], dem = 0; 
        const R = -1, C = -1;
        for( let i = 0 ; i < props.row ; ++ i){
            Board[i] = new Array();
            for(let j = 0; j < props.col; j++)
                Board[i][j] = -1;
        }
        return { Board ,dem ,R , C,undo};
    },
    
    actions:{
        async move(state, { x , y }){
            const Board = state.Board ,undo = state.undo;
            let dem = state.dem;  
            let R = state.R , C = state.C;
            if(Board[x][y] === -1){
                if (dem % 2) Board[x][y] = 'O';
                else Board[x][y] = 'X';  
                R = x ; C = y;  
                undo.push({x, y});
                dem ++;
            }
            else throw new Error("CAN'T MOVE");     
            return { Board ,dem ,R ,C,undo};  
        },
        async un(state){
            const Board = state.Board ,undo = state.undo;
            let dem = state.dem;  
            let R = state.R , C = state.C;
            if(undo.length === 0)   throw new Error("CAN'T MOVE");  
            else{
                const pair = undo.pop();
                dem--;
                Board[pair.x][pair.y] = -1;    
            }
            return { Board ,dem ,R ,C,undo};  
        }
    },
        
    isEnding(state){
        const Board = state.Board ;
        let R = state.R , C = state.C , dem = state.dem;
        if(R === -1) return " CONTINUE";
        let N = Board.length, M = Board[0].length;
        const dx = [],dy = [];
        dx.push(-1) ; dx.push(-1); dx.push(-1); dx.push(0); 
        dy.push(-1) ; dy.push(0); dy.push(1); dy.push(1); 
        for(let i = 0 ; i < 4 ; ++i){
            let idem = 1;
            for(let j = 1 ; j <= 4; ++ j){
                let x = R + dx[i] * j;  
                let y = C + dy[i] * j;
                if( x < 0 || y < 0 || x >= N || y >= M || Board[x][y] !== Board[R][C] || Board[x][y] === -1) break;
                    idem++;       
            }
            for(let j = 1 ; j <= 4; ++ j){
                let x = R + dx[i] * j * -1;  
                let y = C + dy[i] * j * -1;  
                if( x < 0 || y < 0 || x >= N || y >= M || Board[x][y] !== Board[R][C]||Board[x][y] === -1) break;
                    idem++; 
            }
            if(idem >= 5){
                if(dem % 2) return "PLAYER 1 WIN";
                else return "PLAYER 2 WIN";
            }   
        }
        return " CONTINUE";
    }
};
exports.default = xo;

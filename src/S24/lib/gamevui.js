"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const game = {
    default( props = {height: 4}){
        const piles = [[] ,[] ,[] ,[]],a = [];
        const und=[];
        let save = -1 ,A = -1,B = -1,C = -1;
        for (let i = 0 ;i < props.height; ++i)
            for (let j = 0 ;j < props.height; ++j)
                piles[i].push(-1);
        let rand = Math.floor(Math.random()*10);      
        let rand1 = Math.floor(Math.random()*10);
        while(rand1+rand===2*rand1+rand){
            rand = Math.floor(Math.random()*10); 
            rand1 = Math.floor(Math.random()*10);
        }
        for( let i = 0 ; i <props.height*props.height; ++ i)
            a.push( i*rand1 + rand);        
        return { a,piles,save,und,A,B,C};
    }, 
 
    actions:{
        async move( state , { pos , x , y}){
            pos--; x--; y--;
            const piles = state.piles.map(v => v.slice());
            const a = state.a , und=state.und;
            let save = state.save ,A = state.A, B = state.B , C = state.C;
            if( save === -1) {
                if( pos === -1 || a[pos] === -1 )
                throw new Error("CÁC BẠN CẦN CHỌN GIÁ TRỊ BẰNG NÚT Chose TRƯỚC ĐÃ");
                else{
                    let X = pos, Y = a[pos], Z = -1 , I = A ,J = B , K = C;
                    A = pos;
                    save = a[pos];
                    a[pos] = -1;
                    und.push({X,Y,Z,I,J,K});    
                }
            }
            else{
                if( x === -1 || piles[x][y] !== -1 )
                    throw new Error("CÁC BẠN CẦN CHỌN Ô ĐẶT GIÁ TRỊ BẰNG NÚT To ");
                else{
                    let X = x , Y = y , Z = save, I = A ,J = B , K=C;
                    B = x, C = y; 
                    piles[x][y] = save;
                    save = -1;
                    und.push({X,Y,Z,I,J,K});  
                }
            }
            return { a,piles,save,und,A,B,C};
        },
        async undo(state){
            const piles = state.piles.map(v => v.slice());
            const a = state.a , und=state.und;
            let save = state.save, A = state.A, B = state.B, C = state.C;
            if( und.length === 0)
                throw new Error("CAN'T UNDO");
            const pair = und.pop(); 
            if(pair.Z === -1){
                save = pair.Z; a[pair.X] = pair.Y; A = pair.I ; B = pair.J; C = pair.K;
            }
            else{
                save = pair.Z; piles[pair.X][pair.Y] = -1; A = pair.I ; B = pair.J; C = pair.K;
            }
            return { a,piles,save,und,A,B,C}; 
        }
    },
 
    isEnding(state) {
        const piles = state.piles.map(v => v.slice());
        const height = piles.length;
        for (let i = 0 ;i < height; ++i)
            for (let j = 0 ;j < height ; ++j)
                if(piles[i][j] === -1) return "CONTINUE";
        console.table(piles);        
        let res = 0 ,val1 = 0 ,val2 = 0;
        for (let i = 0 ;i < height; ++i){
            let sum = 0;
            for (let j = 0 ;j < height ; ++j){
                sum += piles[i][j];
                if( i === j) val1 += piles[i][j];
                if( i + j + 1 === height) val2 += piles[i][j];
            }
            if(res === 0)  res = sum ;
            else if( res !== sum) return "YOU LOSS. ẤN F5 ĐỂ CHƠI LẠI";
        }
        if( res !== val1 || res !== val2) return "YOU LOSS. ẤN F5 ĐỂ CHƠI LẠI";
        for (let j = 0 ;j < height; ++j){
            let sum = 0;
            for (let i= 0 ;i < height ; ++i)
                sum += piles[i][j];
            if(res === 0)  res = sum ;
            else if( res !== sum) return "YOU LOSS. ẤN F5 ĐỂ CHƠI LẠI";
        }
        return "WOW!! YOU WON";
    }
};
exports.default = game;
 
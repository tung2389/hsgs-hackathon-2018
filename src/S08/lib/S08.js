"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const S08 = {
  default(props = { height }) {
    let h=props.height;
    let piles = [], res = [];
    while(1){
      let temp=Math.floor(Math.random()*(h-1))+1;
      if(2*temp<=h) {
        piles.push(2*temp); piles.push(temp);
        break;
      }
    }
    if(piles[1]%2==1){
      for(let i=1;i<=h;i+=2){
        if(piles[0]!=i&&piles[1]!=i) piles.push(i);
      }
      for(let i=2;i<=h;i+=2){
        if(piles[0]!=i&&piles[1]!=i) piles.push(i);
      }
    }
    else{
      for(let i=2;i<=h;i+=2){
        if(piles[0]!=i&&piles[1]!=i) piles.push(i);
      }
      for(let i=1;i<=h;i+=2){
        if(piles[0]!=i&&piles[1]!=i) piles.push(i);
      }
    }
    let col=[];
    for( let i = 0; i <= h; i++ ) {
      col.push(' ');
    }
    for (let i = 0 ; i < 100 ; i++) {
      let pos1 = Math.floor(Math.random()*(h-1)), pos2 = Math.floor(Math.random()*(h-1));
      if(pos1>1&&pos2>1&&piles[pos1]%2===piles[pos2]%2){
        let rem=piles[pos1];
        piles[pos1]=piles[pos2]; piles[pos2]=rem;
      }
    }
    let numwhite = (h-h%2)/2;
    let temp=Math.floor(Math.random()*(h-numwhite));
    for(let i=temp;i<=temp+numwhite-1;++i) col[piles[i]]='white';
    for(let i=0;i<h;++i){
      if(i<temp&&i>temp+numwhite-1) col[piles[i]]='black';
    }
    let used = [];
    for( let i = 0; i <= h; ++ i )
      used.push(0);
    return { used, col, res, h};
  },

  actions: {
    async move(state, { x }) {
      let used = state.used , col=state.col;
      let res = state.res , h=state.h;
      res.push(x);
      used[x] = 1;
      return { used, col, res, h};
    },
    async StartNewGame(state){
      let used = state.used , col=state.col;
      let res = state.res , h=state.h;
      used=[]; col=[]; res=[];
      let piles=[];
      while(1){
        let temp=Math.floor(Math.random()*(h-1))+1;
        if(2*temp<=h) {
          piles.push(2*temp); piles.push(temp);
          break;
        }
      }
      if(piles[1]%2==1){
        for(let i=1;i<=h;i+=2){
          if(piles[0]!=i&&piles[1]!=i) piles.push(i);
        }
        for(let i=2;i<=h;i+=2){
          if(piles[0]!=i&&piles[1]!=i) piles.push(i);
        }
      }
      else{
        for(let i=2;i<=h;i+=2){
          if(piles[0]!=i&&piles[1]!=i) piles.push(i);
        }
        for(let i=1;i<=h;i+=2){
          if(piles[0]!=i&&piles[1]!=i) piles.push(i);
        }
      }
      for( let i = 0; i <= h; i++ ) {
        col.push(' ');
      }
      for (let i = 0 ; i < 100 ; i++) {
        let pos1 = Math.floor(Math.random()*(h-1)), pos2 = Math.floor(Math.random()*(h-1));
        if(pos1>1&&pos2>1&&piles[pos1]%2===piles[pos2]%2){
          let rem=piles[pos1];
          piles[pos1]=piles[pos2]; piles[pos2]=rem;
        }
      }
      let numwhite = (h-h%2)/2;
      let temp=Math.floor(Math.random()*(h-numwhite));
      for(let i=temp;i<=temp+numwhite-1;++i) col[piles[i]]='white';
      for(let i=0;i<h;++i){
        if(i<temp&&i>temp+numwhite-1) col[piles[i]]='black';
      }
      for( let i = 0; i <= h; ++ i )
        used.push(0);
      return { used, col, res, h};
    },
    async Undo(state){
      let used = state.used , col=state.col;
      let res = state.res , h=state.h;
      if(res.length>0){
        used[res[res.length-1]]=0;
        res.pop();
      }
      return { used, col, res, h};
    }
  },
  isEnding(state) {
    let res=state.res;
    let col=state.col , h=state.h;
    let ok = 1;
    if(res.length===h) {
      for( let i = 0; i < h; i++ ){
        if(res[i]%2===1) {
          let cnt=0,num;
          if(h%2===0) num=h/2;
          else num=(h+1)/2;
          for(let j=i;j<h;++j){
            cnt++;
            if(res[j]%2===0&&cnt<=num) ok=0;
          }
          break;
        }
      }
      let numwhite = (h-h%2)/2;
      for( let i = 0; i < h; i++ ) {
        if(col[res[i]]==='white'){
          for(let j=i;j<h;++j){
            if(j<=i+numwhite-1&&col[res[j]]==='black') ok=0;
          }
          break;
        }
      }
    }
    if(res.length===h){
      if(res[0]!==2*res[1]) ok=0;
      if(ok) return "WON";
      else return "LOST";
    }
    return undefined;
  },
};
exports.default = S08;
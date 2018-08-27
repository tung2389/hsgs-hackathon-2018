"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

//A random function that generates numbers between min and max 
function rand(min, max)
{
    let r = Math.random();
    return Math.floor(r * (max - min) + min);
}

const Chess = {
  //First state
  default(props = {n : 3, m : 4}) 
  {
    const n = props.n; //one side
    const m = props.m; //the other side :P
    let curx, cury; //current position of the Knight
    let defaultx = rand(0, n); //starting x-cordinate of the Knight
    let defaulty = rand(0, m); //starting y-cordinate of the Knight
    let undomovex = []; //Undo-x
    let undomovey = []; //Undo-y
    //On the 3x4 table, there are only 2 viable spots to acheive victory while on the 8x8 table, every starting spot shall lead to victory
    if (n === 3 && m === 4)
    {
      if (rand(0, 2) === 1)
      {
        defaultx = 1;
        defaulty = 0;
      }
      else
      {
        defaultx = 1;
        defaulty = 3;
      }
    }
    //Initialize
    for(let i = 0; i < n * m; i++)
    {
      undomovex[i] = 0;
      undomovey[i] = 0;
    }
    undomovex[0] = defaultx;
    undomovey[0] = defaulty;
    let board = Array(n + 6).fill('normal2');
    let vis   = Array(n + 6).fill(false);
    let cnt = 0;
    for(let i = 0; i < n + 6; i++)
    {
      board[i] = Array(m + 6).fill('normal2');
      vis[i] = Array(m + 6).fill(false);
    }
    board[defaultx][defaulty] = 'horse';
    vis[defaultx][defaulty] = true;
    for(let i = 0; i < n + 6; i++)
    {
      for(let j = 0; j < m + 6; j++)
      {
        if(i < n && j < m)
        {
          if(i === defaultx && j === defaulty)
          {
            board[i][j] = 'horse';
            vis[i][j] = 1;
            curx = i;
            cury = j;
          }
          else
          {
           board[i][j] = 'normal2';
           vis[i][j] = 0;
          }
        }
        else
        {
          board[i][j] = 'normal2';
          vis[i][j] = 1;
        }
      }
    }
    for(let i = 0; i < n; i++)
    {
      for(let j = 0; j < m; j++)
      {
        if(((Math.abs(i - curx) === 2 && Math.abs(j - cury) === 1) || (Math.abs(i - curx) === 1 && Math.abs(j - cury) === 2)) && vis[i][j] == 0)
        board[i][j] = 'cancome';
        else
        {
          if((i != curx||j != cury) && board[i][j] != 'died')
          {
            board[i][j] = 'normal2';
          }
        }
      }
    }
    //return first state
    return {board, vis, curx, cury, cnt, n, m, undomovex, undomovey};
  },
  actions:
  {
    async move(state, {x, y})
    {
        let curx = state.curx;
        let cury = state.cury;
        let board = state.board;
        let vis = state.vis;
        let cnt = state.cnt;
        let n = state.n;
        let m = state.m;
        let undomovex = state.undomovex;
        let undomovey = state.undomovey;
        if(x === curx + 1 && y === cury + 2||
           x === curx + 2 && y === cury + 1||
           x === curx - 1 && y === cury + 2||
           x === curx - 1 && y === cury - 2|| //It's not like you can do all these conditionals everyday
           x === curx + 1 && y === cury - 2||
           x === curx - 2 && y === cury + 1||
           x === curx - 2 && y === cury - 1||
           x === curx + 2 && y === cury - 1)
        {
          if(vis[x][y] === 0) //If spot (x, y) hasn't been moved to before
          {
            vis[x][y] = 1;
            board[x][y] = 'horse';
            board[curx][cury] = 'died';
            curx = x;
            cury = y;
            cnt = cnt+1;
            undomovex[cnt] = x;
            undomovey[cnt] = y;
          }
          else
          {
            throw new Error("cell");
          }
        }
        else
        {
          throw new Error('invalid');
        }
        for(let i = 0; i < n; i++)
        {
          for(let j = 0; j < m; j++)
          {
            if(((Math.abs(i - curx) === 2 && Math.abs(j - cury) === 1) || (Math.abs(i - curx) === 1 && Math.abs(j - cury) === 2)) && board[i][j] != 'died')
            board[i][j] = 'cancome'; //Available spots to travel to 
            else
            {
              if((i != curx || j != cury) && board[i][j] != 'died')
              {
                board[i][j] = 'normal2';
              }
            }
          }
          }
        return {board, vis, curx, cury, cnt, n, m, undomovex, undomovey};
    },
    async reset(state) 
    {
      //This is just like starting a new default state
      let curx = state.curx;
      let cury = state.cury;
      let board = state.board;
      let vis = state.vis;
      let cnt = state.cnt;
      let n = state.n;
      let m = state.m;
      let undomovex = state.undomovex;
      let undomovey = state.undomovey;
      let defaultx = rand(0, n);
      let defaulty = rand(0, m);
      cnt = 0;
      if (n === 3 && m === 4)
      {
        if (rand(0, 2) === 1)
        {
          defaultx = 1;
          defaulty = 0;
        }
        else
        {
          defaultx = 1;
          defaulty = 3;
        }
      }
      for(let i = 0; i < n + 6; i++)
      {
        for(let j = 0; j < n + 6; j++)
        {
          if(i < n && j < m)
          {
            if(i === defaultx && j === defaulty)
            {
              board[i][j] = 'horse';
              vis[i][j] = 1;
              curx = i;
              cury = j;
            }
            else
            {
              board[i][j] = 'normal2';
              vis[i][j] = 0;
            }
          }
          else
          {
            board[i][j] = 'normal2';
            vis[i][j] = 1;
          }
        }
      }
      for(let i = 0; i < n * m; i++)
      {
        undomovex[i] = 0;
        undomovey[i] = 0;
      }
      undomovex[0] = defaultx;
      undomovey[0] = defaulty;
      for(let i = 0; i < n; i++)
      {
        for(let j = 0; j < m; j++)
        {
          if(((Math.abs(i - curx) === 2 && Math.abs(j - cury) === 1) || (Math.abs(i - curx) === 1 && Math.abs(j - cury) === 2)) && vis[i][j] === 0)
          board[i][j] = 'cancome';
          else
          {
            if((i != curx || j != cury) && board[i][j] != 'died')
            {
              board[i][j] = 'normal2';
            }
          }
        }
      }
      return {board, vis, curx, cury, cnt, n, m, undomovex, undomovey};
    },

    async undo(state)
    {
      let curx = state.curx;
      let cury = state.cury;
      let board = state.board;
      let vis = state.vis;
      let cnt = state.cnt;
      let n = state.n;
      let m = state.m;
      let undomovex = state.undomovex;
      let undomovey = state.undomovey;
      if(cnt > 0)
      {
        let posx = undomovex[cnt];
        let posy = undomovey[cnt];
        let posx2 = undomovex[cnt - 1];
        let posy2 = undomovey[cnt - 1];
        board[posx][posy] = 'normal2';
        board[posx2][posy2] = 'horse';
        curx = posx2;
        cury = posy2;
        vis[posx][posy] = 0;
        cnt = cnt - 1;
      }
      for(let i = 0; i < n; i++)
      {
        for(let j = 0; j < m; j++)
        {
          if(((Math.abs(i - curx) === 2 && Math.abs(j - cury) === 1) || (Math.abs(i - curx) === 1 && Math.abs(j - cury) === 2)) && vis[i][j] === 0)
          board[i][j] = 'cancome';
          else
          {
            if((i != curx || j != cury) && board[i][j] != 'died')
            {
              board[i][j] = 'normal2';
            }
          }
        }
      }
      return {board, vis, curx, cury, cnt, n, m, undomovex, undomovey};
    }
  },  

    isEnding(state){
      let curx = state.curx;
      let cury = state.cury;
      let board = state.board;
      let vis = state.vis;
      let cnt = state.cnt;
      let n = state.n;
      let m = state.m;
      let ava = false;
      if(cnt === n * m - 1)
      {
        return "won";
      }
      else
      {
        for (let i = 0; i < n; i++)
        {
        	for (let j = 0; j < m; j++)
        	{
        		if ((Math.abs(curx - i) === 2 && Math.abs(cury - j) === 1) || (Math.abs(curx - i) === 1 && Math.abs(cury - j) === 2))
        		{
        			if (vis[i][j] === 0)
        			{
        				ava = true; //Checking if there is at least one path
        			}
        		}
        	}
        }
        if (!ava)
        {
        	return "lose";
        }
    }
    return null;
   }
};
exports.default = Chess;